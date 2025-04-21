// src/app/features/auth/register/register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = {
    Username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register(this.userData);
  }
}