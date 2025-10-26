import { provideRouter } from '@angular/router';
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core'; // <-- Añade LOCALE_ID
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeCo from '@angular/common/locales/es-CO';
registerLocaleData(localeCo, 'es-CO');
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),  importProvidersFrom(HttpClientModule), { provide: LOCALE_ID, useValue: 'es-CO' }]
};
