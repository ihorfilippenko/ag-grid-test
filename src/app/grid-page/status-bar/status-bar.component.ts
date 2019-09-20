import { Component } from '@angular/core';
import { IStatusPanelParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent {
  private params: IStatusPanelParams;
  private gridColumnApi;
  private isVisible = true;
  private selectedCount: number;
  private rowCount: number;

  agInit(params: IStatusPanelParams) {
      this.params = params;
      this.gridColumnApi = params.columnApi;
      this.selectedCount = this.params.api.getSelectedRows().length;
      this.params.api.addEventListener('rowSelected', this.onRowSelect.bind(this));
      this.params.api.addEventListener('modelUpdated', this.onUpdate.bind(this));
  }

  onRowSelect() {
    this.selectedCount = this.params.api.getSelectedRows().length;
  }

  onUpdate() {
    this.rowCount = this.params.api.getModel().getRowCount();
  }

  onClick() {
    this.isVisible = !this.isVisible;
    this.gridColumnApi.columnController.setColumnVisible('checkbox', this.isVisible);
  }
}
