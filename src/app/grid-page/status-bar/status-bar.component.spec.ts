import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridModule } from 'ag-grid-angular';
import { LandingPageComponent } from '../landing-page.component';
import { StatusBarComponent } from '../status-bar/status-bar.component';
import { CustomHeaderComponent } from '../custom-header/custom-header.component';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';

describe('StatusBarComponent', () => {
  let component: StatusBarComponent;
  let fixture: ComponentFixture<StatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingPageComponent,
        StatusBarComponent,
        CustomHeaderComponent
      ],
      imports: [
        HttpClientModule,
        AgGridModule.withComponents([
        StatusBarComponent,
        CustomHeaderComponent])
      ],
      providers: [
        DataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
