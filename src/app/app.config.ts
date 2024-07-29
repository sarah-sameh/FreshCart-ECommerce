import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { myHttpInterceptor } from './shared/interceptors/my-http.interceptor';
import {  withInterceptors } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    provideHttpClient(withFetch()),

    provideHttpClient(withInterceptors(
      [ myHttpInterceptor])), provideAnimationsAsync(),

    importProvidersFrom(
      ToastrModule.forRoot({
        // positionClass: 'toast-bottom-right',
         }),
      BrowserAnimationsModule 
    ),
  ]
};
