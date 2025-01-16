import { Component, Input, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-workout-weeks',
  templateUrl: './workout-weeks.component.html',
  styleUrls: ['./workout-weeks.component.scss'],
  standalone: false,
})
export class WorkoutWeeksComponent {
  @ViewChild('scroller') scroller: any;
  @Input() weeks: number;

  gridApis: { [key: string]: any[] } = {};

  onGridReady(
    { event, weekDay }: { event: any; weekDay: number },
    weekIndex: number
  ) {
    const key = `${weekIndex}-${weekDay}`;

    if (!this.gridApis[key]) {
      this.gridApis[key] = [];
    }

    this.gridApis[key].push(event);

    this.configureDropZones();
  }

  configureDropZones() {
    Object.keys(this.gridApis).forEach((key) => {
      const weekGrids = this.gridApis[key];

      weekGrids.forEach((gridApi, index) => {
        Object.keys(this.gridApis).forEach((otherKey) => {
          if (key !== otherKey) {
            const otherWeekGrids = this.gridApis[otherKey];

            otherWeekGrids.forEach((otherGridApi: AgGridAngular) => {
              const dropZone = otherGridApi.api.getRowDropZoneParams({
                onDragStop: (params: any) => {
                  const nodes = params.nodes;
                  gridApi.api.applyTransaction({
                    remove: nodes.map((node: any) => node.data),
                  });
                },
              });
              console.log(gridApi.api.dropZones);
              gridApi.api.addRowDropZone(dropZone);
            });
          }
        });
      });
    });
  }
}
