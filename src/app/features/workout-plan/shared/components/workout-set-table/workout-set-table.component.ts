import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridOptions, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-workout-set-table',
  templateUrl: './workout-set-table.component.html',
  styleUrl: './workout-set-table.component.scss',
  standalone: false,
})
export class WorkoutSetTableComponent implements ICellRendererAngularComp {
  rowData: any[] = [];
  data: any;
  gridOptions: GridOptions<any> = {
    columnDefs: [
      { field: 'set', headerName: 'Set', width: 100 },
      { field: 'reps', headerName: 'Reps', width: 100 },
      { field: 'percentual', headerName: '%', flex: 1 },
    ],
    defaultColDef: {
      editable: true,
    },
  };
  gridApi: any;

  faPlus = faPlus;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.rowData = params.data.detailData || [];
    this.data = params.data;
    this.gridApi = params.api;
  }

  refresh(): boolean {
    return false;
  }

  addSet() {}

  save() {
    this.data.fullWidth = false;
    this.gridApi.redrawRows();
    this.gridApi.resetRowHeights();
  }
}
