import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideAnimations(),importProvidersFrom(ToastrModule.forRoot({
    timeOut:4000,positionClass:'toast-top-right',preventDuplicates:true
  })), provideRouter(routes),importProvidersFrom(FormsModule),provideHttpClient(), provideClientHydration(withEventReplay()), provideAnimationsAsync('noop')]
};
