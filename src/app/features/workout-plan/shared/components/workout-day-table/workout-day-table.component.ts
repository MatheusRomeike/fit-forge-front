import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import type {
  GridOptions,
  GridReadyEvent,
  RowDropZoneParams,
} from 'ag-grid-community';

@Component({
  selector: 'app-workout-day-table',
  templateUrl: './workout-day-table.component.html',
  styleUrl: './workout-day-table.component.scss',
  standalone: false,
})
export class WorkoutDayTableComponent {
  @ViewChild('grid') grid: any;
  @Input() weekDay: number;
  @Output() gridReady = new EventEmitter<{ event: any; weekDay: number }>();

  exercises: [];

  faPlus = faPlus;

  rowData = [
    {
      id: 1,
      exercise: 'Squat (Barbell)',
      sets: 3,
      reps: 0,
      intesity: 0,
    },
    { id: 2, exercise: 'Squat (Barbell)', sets: 1, reps: 0, intesity: 0 },
    {
      id: 3,
      exercise: 'Behind-The-Neck Press (Smith Machine with Dummbels)',
      sets: 1,
      reps: 0,
      intesity: 0,
    },
  ];

  gridOptions: GridOptions<any> = {
    columnDefs: [
      {
        headerName: '#',

        editable: false,
        width: 40,
        rowDrag: true,
      },
      {
        field: 'exercise',

        cellDataType: 'string',
        flex: 1,
        wrapText: false,
      },
      { field: 'sets', width: 65 },
      { field: 'reps', width: 65 },
      { field: 'intesity', width: 80 },
    ],
    defaultColDef: {
      editable: true,
      cellDataType: 'number',
    },
    rowDragManaged: true,
    suppressMoveWhenRowDragging: true,
  };

  addExercise() {
    console.log(this.grid.api.getRowDropZoneParams());
  }

  onGridReady(event: GridReadyEvent) {
    this.gridReady.emit({ event, weekDay: this.weekDay });
  }

  getDropZoneParams(): RowDropZoneParams {
    return {
      getContainer: () => document.querySelector('.ag-grid')!,
    };
  }
}
