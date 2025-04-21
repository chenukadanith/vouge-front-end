// src/app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'https://localhost:7093/api/auth'; // Your backend API
  currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState() {
    const token = localStorage.getItem('jwt_token');
    if (token && !this.isTokenExpired(token)) {
      this.setAuthState(token);
    }
  }

  private setAuthState(token: string) {
    localStorage.setItem('jwt_token', token);
    const decoded = jwtDecode<User>(token);
    this.currentUser.set(decoded);
    this.isAuthenticated.set(true);
  }

  private isTokenExpired(token: string): boolean {
    const decoded = jwtDecode<{ exp: number }>(token);
    return Date.now() >= decoded.exp * 1000;
  }

  register(userData: { email: string; password: string; Username: string }) {
    return this.http.post<{ message: string }>(`${this.API_URL}/register`, userData)
      .subscribe({
        next: (res) => {
          console.log('Registration success:', res.message);
          // No token to set, just navigate to login
          this.router.navigate(['/login'])
            .then(() => console.log('Navigated to login page'))
            .catch(err => console.error('Navigation error:', err));
        },
        error: (err) => {
          console.error('Registration failed', err);
          // Handle error (show to user, etc.)
        }
      });
  }

  login(credentials: { Username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.API_URL}/login`, credentials)
      .subscribe({
        next: (res) => {
          this.setAuthState(res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Login failed', err)
      });
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
}