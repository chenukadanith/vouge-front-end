import { Injectable, signal, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students = signal<any[]>([]);
  private apiUrl = 'https://localhost:7093/api/students';
  
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only try to modify window if in browser environment
    if (isPlatformBrowser(this.platformId) && isDevMode()) {
      // This will only run in the browser, not during SSR
      (window as any).process = { env: { NODE_TLS_REJECT_UNAUTHORIZED: '0' } };
    }
  }

  fetchAll() {
    this.http.get<any[]>(this.apiUrl, {
      withCredentials: true  // Include cookies if needed
    }).subscribe({
      next: (data) => {
        console.log('API Success:', data);
        this.students.set(data);
      },
      error: (err) => {
        console.error('API Connection Failed:', err);
        this.handleError(err);
      }
    });
  }

  private handleError(error: any) {
    this.students.set([]);
    
    if (error.status === 0) {
      console.warn('Client-side or network error:', error.error);
    } else {
      console.warn(`Backend returned code ${error.status}:`, error.error);
    }
  }
}