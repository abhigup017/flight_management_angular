import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { MasterModule } from './app/master/master.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MasterModule)
  .catch(err => console.error(err));
