import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // BU SATIR ŞART

bootstrapApplication(AppComponent, appConfig) // BU KISIM %100 GEREKLİ
  .catch(err => console.error(err));
