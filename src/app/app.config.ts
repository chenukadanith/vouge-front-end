import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from './toast/toast.service'; // Import our custom Toast Service

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(), // Required for toast animations
    
    // PrimeNG providers (keep if you're still using PrimeNG elsewhere)
    MessageService,
    importProvidersFrom(ToastModule),
    
    // Our custom Toast Service
    ToastService
  ]
};