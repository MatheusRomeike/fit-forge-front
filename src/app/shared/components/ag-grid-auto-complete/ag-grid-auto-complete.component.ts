import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'auto-complete',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  host: {
    style: `position: absolute;
					left: 0px; 
					top: 0px;
					background-color: transparant;
					`,
  },
  template: `
    <input
      #input
      [(ngModel)]="inputValue"
      (ngModelChange)="processDataInput($event)"
      class="bg-base-100 input input-ghost"
      [style.width]="params.column.actualWidth + 'px'"
    />
    <ag-grid-angular
      style="font-weight: 150;"
      [style.height]="gridHeight + 'px'"
      [style.max-width]="gridWidth + 'px'"
      class="ag-theme-balham"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [rowSelection]="rowSelection"
      (gridReady)="onGridReady($event)"
      (rowClicked)="rowClicked($event)"
    >
    </ag-grid-angular>
  `,
})
export class AgGridAutoComplete
  implements ICellEditorAngularComp, AfterViewInit
{
  // variables for agGrid
  public params: any;
  public gridApi: any;
  public rowData: any;
  public columnDefs: [{}];
  public rowSelection: { mode: 'singleRow' | 'multiRow' } & Record<
    string,
    any
  > = {
    mode: 'singleRow',
    checkboxes: false,
    enableClickSelection: true,
  };
  public columnFilter: any;
  // variables for component
  public returnObject: boolean;
  public cellValue: string;
  public filteredRowData: any;
  public inputValue: string;
  public apiEndpoint: string;
  public gridHeight: number = 125;
  public gridWidth: number = 375;
  public useApi: boolean;
  public propertyName: string;
  public isCanceled: boolean = true;
  public selectedObject: any = {};

  @ViewChild('input') input: ElementRef;

  constructor(private httpClient: HttpClient) {}

  ngAfterViewInit() {
    window.setTimeout(() => {
      if (this.inputValue == this.cellValue) {
        this.input.nativeElement.select();
      } else {
        this.input.nativeElement.focus();
      }
      if (this.inputValue && !this.useApi) this.updateFilter();
    });
  }

  agInit(params: any): void {
    this.params = params;
    if (!params.rowData) {
      this.apiEndpoint = params.apiEndpoint;
      this.useApi = true;
      this.rowData = [{}];
    } else {
      this.rowData = params.rowData();
    }
    if (params.gridHeight) this.gridHeight = params.gridHeight;
    if (params.gridWidth) this.gridWidth = params.gridWidth;
    this.columnDefs = params.columnDefs;
    this.propertyName = params.propertyRendered;
    this.cellValue = params.value[this.propertyName];
    this.returnObject = params.returnObject;

    if (!params.charPress) {
      if (this.cellValue) this.inputValue = this.cellValue;
    } else {
      this.inputValue = params.charPress;
    }
  }

  getValue(): any {
    if (!this.returnObject) return this.selectedObject[this.propertyName];
    return this.selectedObject;
  }
  isPopup(): boolean {
    return true;
  }
  isCancelAfterEnd(): boolean {
    return this.isCanceled;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    if (this.params.headerHeight != null) {
      this.gridApi.setGridOption('headerHeight', this.params.headerHeight);
    }

    this.gridApi
      .getColumnFilterInstance(this.propertyName)
      .then((filterInstance: any) => {
        this.columnFilter = filterInstance;
      });
  }

  rowClicked(params: any) {
    this.selectedObject = params.data;
    this.isCanceled = false;
    this.params.api.stopEditing();
  }

  rowConfirmed() {
    if (this.gridApi.getSelectedRows()[0]) {
      this.selectedObject = this.gridApi.getSelectedRows()[0];
      this.isCanceled = false;
    }
    this.params.api.stopEditing();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: any) {
    event.stopPropagation();
    if (event.key == 'Escape') {
      this.params.api.stopEditing();
      return false;
    }
    if (event.key == 'Enter' || event.key == 'Tab') {
      this.rowConfirmed();
      return false;
    }
    if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
      this.navigateGrid();
      return false;
    }
    return null;
  }

  processDataInput(event: any) {
    if (this.useApi) {
      if (event.length == 0) this.gridApi.setRowData();
      if (event.length == 2) {
        this.getApiData(event).subscribe((data) => {
          this.rowData = data;
          setTimeout(() => {
            this.updateFilter();
          });
        });
      }
      if (event.length > 2) this.updateFilter();
    } else {
      this.updateFilter();
    }
  }

  getApiData(filter: any) {
    return this.httpClient.get(this.apiEndpoint + this.toQueryString(filter));
  }

  toQueryString(filter: any) {
    return '?' + this.propertyName + '=' + filter;
  }

  updateFilter() {
    this.columnFilter.setModel({
      type: 'contains ',
      filter: this.inputValue,
    });
    this.gridApi.onFilterChanged();
    if (this.gridApi.getDisplayedRowAtIndex(0)) {
      this.gridApi.getDisplayedRowAtIndex(0).setSelected(true);
      this.gridApi.ensureIndexVisible(0, 'top');
    } else {
      this.gridApi.deselectAll();
    }
  }

  navigateGrid() {
    if (
      this.gridApi.getFocusedCell() == null ||
      this.gridApi.getDisplayedRowAtIndex(
        this.gridApi.getFocusedCell().rowIndex
      ) == null
    ) {
      // check if no cell has focus, or if focused cell is filtered
      this.gridApi.setFocusedCell(
        this.gridApi.getDisplayedRowAtIndex(0).rowIndex,
        this.propertyName
      );
      this.gridApi
        .getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex)
        .setSelected(true);
    } else {
      this.gridApi.setFocusedCell(
        this.gridApi.getFocusedCell().rowIndex,
        this.propertyName
      );
      this.gridApi
        .getDisplayedRowAtIndex(this.gridApi.getFocusedCell().rowIndex)
        .setSelected(true);
    }
  }
}
