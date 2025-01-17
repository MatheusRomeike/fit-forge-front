import { Component, ViewChild } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AgGridAngular, ICellRendererAngularComp } from 'ag-grid-angular';
import { GridOptions, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-workout-set-table',
  templateUrl: './workout-set-table.component.html',
  styleUrl: './workout-set-table.component.scss',
  standalone: false,
})
export class WorkoutSetTableComponent implements ICellRendererAngularComp {
  @ViewChild('grid') setGrid: AgGridAngular;
  rowData: any[] = [];
  rowDataBackup: any[] = [];
  exerciseName = '';
  data: any;
  gridOptions: GridOptions<any> = {
    columnDefs: [
      { field: 'set', headerName: 'Set', editable: false, minWidth: 60 },
      {
        field: 'reps',
        headerName: 'Reps',
        editable: true,
        minWidth: 70,
        cellEditor: 'agTextCellEditor',
        valueSetter: (params: any) => {
          const regex = /^\d+(-\d+)?$/;
          const value = params.newValue;

          if (regex.test(value)) {
            params.data.reps = value;
            return true;
          } else {
            return false;
          }
        },
      },

      {
        field: 'intesity',
        headerName: 'Intensity (%)',
        minWidth: 110,
        valueSetter: (params: any) => {
          const regex = /^(100|[1-9]?[0-9])$/;
          const value = params.newValue;
          if (regex.test(value)) {
            params.data.intesity = value;
            return true;
          } else {
            return false;
          }
        },
      },
      {
        field: 'restTime',
        headerName: 'Rest Time',
        minWidth: 100,
        editable: true,
        cellEditor: 'agTextCellEditor',
        valueSetter: (params: any) => {
          const regex = /^\d{1,2}:\d{2}$/;
          const value = params.newValue;

          if (regex.test(value)) {
            params.data.restTime = value;
            return true;
          } else {
            return false;
          }
        },
      },
    ],
    defaultColDef: {
      editable: true,
      flex: 1,
    },
    singleClickEdit: true,
  };
  gridApi: any;

  faPlus = faPlus;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.exerciseName = params.data.exercise;
    this.rowData = params.data.detailData || [];
    this.rowDataBackup = JSON.parse(JSON.stringify(this.rowData));
    this.data = params.data;
    this.gridApi = params.api;
  }

  refresh(): boolean {
    return false;
  }

  addSet() {
    const lastSet = this.rowData[this.rowData.length - 1];
    let newSet = { ...lastSet };
    newSet.set += 1;

    this.setGrid.api.applyTransaction({ add: [newSet] });
    this.rowData.push(newSet);
  }

  cancel() {
    this.rowData = JSON.parse(JSON.stringify(this.rowDataBackup));
    this.data.detailData = this.rowData;
    this.updateMainRowData(); // Recalcula a média após o cancelamento
    this.close();
  }

  save() {
    this.setGrid.api.stopEditing();
    this.updateMainRowData(); // Recalcula a média antes de salvar
    this.close();
  }

  private close() {
    this.enableAutoHeight();
    this.data.fullWidth = false;
    this.gridApi.redrawRows();
    this.gridApi.resetRowHeights();
  }

  private enableAutoHeight() {
    const columnDefs = this.gridApi.getColumnDefs()?.map((col: any) => {
      if ('field' in col && col.field === 'exercise') {
        return { ...col, autoHeight: true };
      }
      return col;
    });
    this.gridApi.setGridOption('columnDefs', columnDefs);
  }

  private updateMainRowData() {
    const totalReps = this.rowData.reduce((sum: number, set: any) => {
      const reps = parseFloat(set.reps);
      return !isNaN(reps) ? sum + reps : sum;
    }, 0);

    const totalSets = this.rowData.length;

    const totalIntesity = this.rowData.reduce(
      (sum: number, set: any) =>
        sum +
        (set.intesity && !isNaN(parseFloat(set.intesity))
          ? parseFloat(set.intesity)
          : 0),
      0
    );

    const totalRestTime = this.rowData.reduce((sum: any, set: any) => {
      const restTime = set.restTime;
      if (restTime) {
        const [minutes, seconds] = restTime.split(':').map(Number);
        if (!isNaN(minutes) && !isNaN(seconds)) {
          sum += minutes * 60 + seconds;
        }
      }
      return sum;
    }, 0);

    if (totalSets != 0) {
      this.data.sets = totalSets;

      if (Math.round(totalReps / totalSets) > 0)
        this.data.reps =
          totalSets > 0 ? Math.round(totalReps / totalSets) : '-';
      if (Math.round(totalIntesity / totalSets))
        this.data.intesity =
          totalSets > 0 ? Math.round(totalIntesity / totalSets) : '-';
      if (this.formatTime(totalRestTime / totalSets) != '0:00')
        this.data.restTime =
          totalSets > 0 ? this.formatTime(totalRestTime / totalSets) : '-';
    }
  }

  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
