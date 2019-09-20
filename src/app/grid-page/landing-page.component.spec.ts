import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridModule } from 'ag-grid-angular';
import { LandingPageComponent } from './landing-page.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { DataService } from '../services/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey('[TRIAL]_3_November_2019_[v2]_MTU3MjczOTIwMDAwMA==f60968cd3fa123e256cdb99d464f7136');

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingPageComponent,
        StatusBarComponent,
        CustomHeaderComponent
      ],
      imports: [
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should render title in a h1 tag', () => {
    fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Data grid demo app');
  });

  it('should have row value', () => {
    fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.ag-name-value').textContent);
  });
});
