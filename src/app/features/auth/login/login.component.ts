// src/app/features/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../../toast/toast.service'; // Import our custom toast service



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    Username: '',
    password: ''
  };
  isLoading = false;



  constructor(private authService: AuthService,private messageService: MessageService,private toastService: ToastService ) {}

  

  onSubmit() {
  
    this.authService.login(this.credentials);

    this.isLoading = true;
    this.toastService.success('Login successful!', 'Welcome',);


    
    // On error
    // this.messageService.add({
    //   severity: 'error',
    //   summary: 'Error',
    //   detail: 'Invalid credentials'
    // });
  }
}