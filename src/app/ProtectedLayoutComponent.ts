import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { ToastContainerComponent } from './toast/toast-container.component'; // Import our custom toast container

@Component({
  selector: 'app-protected-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    FooterComponent, 
    ToastModule,
    ToastContainerComponent // Add our custom toast container
  ],
  template: `
    <div class="app-container">
      <app-navbar class="navbar" />
      <div class="main-content">
        <!-- <app-sidebar class="sidebar" /> -->
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </div>
      <app-footer class="footer" />
      
      <!-- PrimeNG Toast (keep if you're still using it in some places) -->
      <!-- <p-toast position="top-left"></p-toast> -->
      
      <!-- Our Custom Toast Container (positioned at top-right by default) -->
      <app-toast-container></app-toast-container>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .main-content {
      display: flex;
      flex: 1;
    }
    
    .content-area {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
    
    .footer {
      margin-top: auto;
    }
  `]
})
export class ProtectedLayoutComponent {}