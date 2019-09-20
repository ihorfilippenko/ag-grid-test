import { Component } from '@angular/core';

enum CheckBoxState {
  UNCHECKED = 0,
  CHECKED = 1,
  PARTIAL = 2
}

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.css']
})
export class CustomHeaderComponent {
  private params: any;
  private checkState: CheckBoxState;
  private selCount;
  private rowCount;

  agInit(params) {
    this.params = params;
    this.rowCount = this.params.api.getSelectedRows().length;
    this.checkState = CheckBoxState.UNCHECKED;
    this.params.api.addEventListener('rowSelected', this.onRowSelected.bind(this));
    this.params.api.addEventListener('modelUpdated', this.onModelUpdated.bind(this));
  }

  onChange() {
    if ((this.checkState === CheckBoxState.UNCHECKED) ||
        (this.checkState === CheckBoxState.PARTIAL)) {
      this.params.api.selectAll();
      this.checkState = CheckBoxState.CHECKED;
    } else {
      this.params.api.deselectAll();
      this.checkState = CheckBoxState.UNCHECKED;
    }
  }

  refreshCheckBox() {
    if (this.rowCount === this.selCount) {
      this.checkState = CheckBoxState.CHECKED;
    } else if (this.selCount === 0) {
        this.checkState = CheckBoxState.UNCHECKED;
    } else if (this.selCount < this.rowCount) {
        this.checkState = CheckBoxState.PARTIAL;
    }
  }

  onModelUpdated() {
    this.rowCount = this.params.api.getModel().getRowCount();
    this.refreshCheckBox();
  }

  onRowSelected() {
    this.selCount = this.params.api.getSelectedRows().length;
    this.refreshCheckBox();
  }
}
