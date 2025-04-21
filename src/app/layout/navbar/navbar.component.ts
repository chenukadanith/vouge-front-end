import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../app/core/services/auth.service';
import { ToastService } from '../../../app/toast/toast.service'; // Import our custom Toast Service

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() brandName: string = 'Vogue';
    // @Input() logoUrl: string = 'assets/logo.png';
  @Input() isLoggedIn: boolean = true;
  @Input() userName: string = 'John Doe';
  @Input() userAvatar: string = 'https://via.placeholder.com/40x40';
  
  @Output() logout = new EventEmitter<void>();  
  
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const navbar = document.querySelector('.navbar');
    if (this.isMenuOpen) {
      navbar?.classList.add('mobile-menu-open');
    } else {
      navbar?.classList.remove('mobile-menu-open');
    }
  }
  constructor(private authService: AuthService,private toastService:ToastService) {}

  onLogout(event: Event) {
    event.preventDefault(); 
    event.stopPropagation(); 
    this.authService.logout();
    this.toastService.success('Logout successful!', 'Please Login',);

  }
}