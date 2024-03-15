import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { authStore } from './app/auth.store';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom([authStore]),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })
],
}).catch((err) => console.error(err));
