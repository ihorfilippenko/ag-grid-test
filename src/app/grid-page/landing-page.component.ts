import { Component } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid-community';
import 'ag-grid-enterprise';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private frameworkComponents;
  private statusBar;
  private dataList = [];
  private columnDefs = [
    {
      headerName: '',
      field: 'checkbox',
      id: 'checkboxes',
      enableSelAll: true,
      checkboxSelection: true,
      width: 15,
    },
    {
      headerName: '',
      field: 'thumbnails',
      width: 50,
      autoHeight: true,
      cellRenderer: params => {
        return '<img height="80" src=' + params.value + '>';
      }
    },
    {
      headerName: 'Published on',
      field: 'published',
    },
    {
      headerName: 'Video Title',
      field: 'url',
      cellRenderer: params => {
        return '<a href="' + params.value.url +
          '" target="_blank">' + params.value.title + '</a>';
      }
    },
    {
      headerName: 'Description',
      field: 'description',
    },
  ];
  private gridOptions: GridOptions = {
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    columnDefs: this.columnDefs,
    rowData: this.dataList
  };

  constructor(private dataService: DataService) {
    this.frameworkComponents = {
      statusBarComponent: StatusBarComponent,
      agColumnHeader: CustomHeaderComponent
    };
    this.statusBar = {
      statusPanels: [
        {
          statusPanel: 'statusBarComponent'
        }
      ]
    };
  }

  getRowHeight() {
    return 85;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.fetchData();
  }

  onFrameResize() {
    this.gridApi.sizeColumnsToFit();
  }

  fetchData() {
    this.dataService.fetchData().subscribe((data: object[]) => {
      const key = 'items';
      if (key in data) {
        const itemList: any[] = data[key];
        itemList.forEach(res => {
          this.dataList.push({
            thumbnails: res.snippet.thumbnails.default.url,
            description: res.snippet.description,
            published: res.snippet.publishedAt,
            url: {
              url: 'https://www.youtube.com/watch?v=' + res.id.videoId,
              title: res.snippet.title
            }
          });
        });
        this.gridApi.setRowData(this.dataList);
        this.gridApi.sizeColumnsToFit();
      }
    });
  }

  getContextMenuItems(params) {
    let result = [];
    if (params.column.colId === 'url') {
      result = [
        {
          name: 'Open in new tab',
          action: () => {
            window.open(params.value.url, '_blank');
          }
        },
        'copyWithHeaders',
        'copy',
        'paste',
        'separator',
        'export'
      ];
    } else {
      result = [
        'copyWithHeaders',
        'copy',
        'paste',
        'separator',
        'export'
      ];
    }
    return result;
  }
}
