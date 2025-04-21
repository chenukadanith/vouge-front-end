import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastContainerComponent } from './toast/toast-container.component'; // Import our custom toast container

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    ToastModule,
    ToastContainerComponent // Add our custom toast container
  ],
  template: `
    <div class="public-container">
      <router-outlet></router-outlet>
      
      <!-- PrimeNG Toast -->
      
      <!-- Our Custom Toast Container -->
      <app-toast-container></app-toast-container>
    </div>
  `,
  styles: [`
    .public-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class PublicLayoutComponent {}