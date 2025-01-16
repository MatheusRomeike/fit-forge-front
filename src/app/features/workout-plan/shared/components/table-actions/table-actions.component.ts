import { Component } from '@angular/core';
import {
  faCopy,
  faNoteSticky,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
  standalone: false,
})
export class TableActionsComponent implements ICellRendererAngularComp {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  faCopy = faCopy;
  faNoteSticky = faNoteSticky;

  params: any;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  onActionClick(action: string) {
    if (this.params && this.params.onAction) {
      this.params.onAction({ action, data: this.params.data });
    }
  }
}
