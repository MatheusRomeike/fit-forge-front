import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AgGridAngular } from 'ag-grid-angular';
import type {
  CellValueChangedEvent,
  GridOptions,
  GridReadyEvent,
  IsFullWidthRowParams,
  RowHeightParams,
} from 'ag-grid-community';
import { AgGridAutoComplete } from '../../../../../shared/components/ag-grid-auto-complete/ag-grid-auto-complete.component';
import { ExerciseService } from '../../../../../shared/services/exercise.service';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { WorkoutSetTableComponent } from '../workout-set-table/workout-set-table.component';

@Component({
  selector: 'app-workout-day-table',
  templateUrl: './workout-day-table.component.html',
  styleUrl: './workout-day-table.component.scss',
  standalone: false,
})
export class WorkoutDayTableComponent {
  @ViewChild('grid') grid: AgGridAngular;
  @Input() exercises: any[] = [];
  @Input() weekDay: number;
  @Output() gridReady = new EventEmitter<{ event: any; weekDay: number }>();

  constructor(
    private translateService: TranslateService,
    private exerciseService: ExerciseService
  ) {}

  faPlus = faPlus;

  gridOptions: GridOptions<any> = {
    columnDefs: [
      {
        headerName: '',
        editable: false,
        width: 0,
        rowDrag: true,
      },
      {
        field: 'exercise',
        minWidth: 100,
        cellDataType: 'string',
        flex: 1,
        wrapText: true,
        autoHeight: true,

        cellEditor: AgGridAutoComplete,
        cellEditorParams: {
          propertyRendered: 'value',
          returnObject: true,
          headerHeight: 0,
          rowData: this.getExercises.bind(this),
          columnDefs: [
            { headerName: 'Exercise', field: 'value', filter: true },
          ],
        },
        valueFormatter: (params) => {
          if (params.value) return params.value.value;
          return '';
        },
      },
      {
        field: 'sets',
        width: 65,
        headerTooltip: this.getSetTooltip(),
        valueSetter: (params: any) => {
          const regex = /^\d+$/; // Matches numbers only (e.g., 1, 2, 3)
          const value = params.newValue;
          if (regex.test(value)) {
            params.data.sets = value;
            return true;
          } else {
            return false;
          }
        },
      },
      {
        field: 'reps',
        cellDataType: 'string',
        width: 65,
        headerTooltip: this.getSetTooltip(),
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
        width: 80,
        cellDataType: 'string',
        headerTooltip: this.getSetTooltip(),
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
        width: 100,
        cellDataType: 'string',
        headerTooltip: this.getSetTooltip(),
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

      {
        headerName: '',
        pinned: 'right',
        width: 0,
        cellRenderer: TableActionsComponent,
        cellRendererParams: {
          onAction: (event: { action: string; data: any }) =>
            this.handleAction(event),
        },
        editable: false,
      },
    ],
    defaultColDef: {
      editable: true,
      cellDataType: 'number',
    },
    rowDragManaged: true,
    suppressMoveWhenRowDragging: true,
    singleClickEdit: true,
    getRowHeight: (params) => this.getRowHeight(params),
    rowSelection: {
      mode: 'multiRow',
    },
    rowDragMultiRow: true,
    rowDragText: (params: any, dragItemCount: number) => {
      console.log(dragItemCount);
      if (dragItemCount > 1) {
        let translation = '';
        this.translateService.get('exercises').subscribe((x) => {
          translation = x;
        });
        return dragItemCount + ` ${translation}`;
      }
      return params.rowNode!.data.exercise;
    },
    onCellValueChanged: (event) => this.onCellValueChanged(event),
  };

  WorkoutSetTableComponent = WorkoutSetTableComponent;

  getExercises() {
    return this.exercises;
  }

  addExercise() {
    // Encontra o maior ID para incrementar
    const newId = this.grid.api.getDisplayedRowCount() + 1;

    // Define os dados padrão para o novo exercício
    const newExercise = {
      id: newId,
      exercise: ``,
      sets: 1,
      reps: '-',
      intesity: '-',
      restTime: '-',
      detailData: [
        {
          set: 1,
          reps: '-',
          intesity: '-',
          restTime: '-',
        },
      ],
    };

    this.grid.api.applyTransaction({ add: [newExercise] });
  }

  onGridReady(event: GridReadyEvent) {
    this.gridReady.emit({ event, weekDay: this.weekDay });
  }

  public getRowHeight: (params: RowHeightParams) => number | undefined | null =
    (params: RowHeightParams) => {
      const isFullWidth = params.node.data.fullWidth;
      if (isFullWidth) {
        return 250;
      }
      return 40;
    };

  public isFullWidthRow: (params: IsFullWidthRowParams) => boolean = (
    params: IsFullWidthRowParams
  ) => {
    return params.rowNode.data.fullWidth;
  };

  handleAction(event: { action: string; data: any }) {
    const { action, data } = event;
    this.grid.api.stopEditing();

    switch (action) {
      case 'edit':
        data.fullWidth = true;
        this.disableAutoHeight();
        break;
      case 'delete':
        this.grid.api.applyTransaction({ remove: [data] });
        break;
      case 'duplicate':
        const duplicateItem = { ...data };
        this.grid.api.applyTransaction({ add: [duplicateItem] });
        break;
      case 'note':
        console.log('Note clicked', data);
        break;
      default:
        console.warn('Unknown action', action);
    }
    this.grid.api.redrawRows();
    this.grid.api.resetRowHeights();
  }

  private disableAutoHeight() {
    this.gridOptions.columnDefs = this.gridOptions.columnDefs?.map((col) => {
      if ('field' in col && col.field === 'exercise') {
        return { ...col, autoHeight: false };
      }
      return col;
    });
    this.grid.api.setGridOption('columnDefs', this.gridOptions.columnDefs);
  }

  private onCellValueChanged(event: CellValueChangedEvent) {
    const { colDef, data, newValue } = event;

    switch (colDef.field) {
      case 'sets':
        data.detailData = Array.from({ length: newValue }, (_, i) => ({
          set: i + 1,
          reps: data.reps || 0,
          percentual: data.intesity || 0,
        }));
        break;
      case 'reps':
        data.detailData.forEach((set: any) => {
          set.reps = newValue;
        });
        break;
      case 'intesity':
        data.detailData.forEach((set: any) => {
          set.intesity = newValue;
        });
        break;
      case 'restTime':
        data.detailData.forEach((set: any) => {
          set.restTime = newValue;
        });
        break;
    }
  }

  private getSetTooltip(): string {
    return 'Caso altere um set específico, esse valor será vazio.';
  }
}
