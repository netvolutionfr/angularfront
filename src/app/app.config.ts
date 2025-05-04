import {ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {Configuration} from './api';
import {environment} from '../environments/environment';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: Configuration,
      useValue: new Configuration({
        basePath: environment.apiUrl
      })
    },
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
          preset: Aura
        }
      }),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ]
};
