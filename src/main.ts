import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey('[TRIAL]_3_November_2019_[v2]_MTU3MjczOTIwMDAwMA==f60968cd3fa123e256cdb99d464f7136');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
