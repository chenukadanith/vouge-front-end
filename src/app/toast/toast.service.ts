// toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast, ToastType } from './toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];
  private toastsSubject: BehaviorSubject<Toast[]> = new BehaviorSubject<Toast[]>([]);
  
  constructor() {}

  // Get the observable to subscribe to in components
  getToasts(): Observable<Toast[]> {
    return this.toastsSubject.asObservable();
  }

  // Show a toast with the given parameters
  show(message: string, type: ToastType = ToastType.INFO, title?: string, duration: number = 5000): void {
    const id = this.generateId();
    const toast: Toast = {
      id,
      message,
      type,
      title,
      duration
    };

    this.toasts.push(toast);
    this.toastsSubject.next([...this.toasts]);

    // Auto remove after duration
    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  // Convenience methods for different toast types
  success(message: string, title?: string, duration?: number): void {
    this.show(message, ToastType.SUCCESS, title, duration);
  }

  error(message: string, title?: string, duration?: number): void {
    this.show(message, ToastType.ERROR, title, duration);
  }

  info(message: string, title?: string, duration?: number): void {
    this.show(message, ToastType.INFO, title, duration);
  }

  warning(message: string, title?: string, duration?: number): void {
    this.show(message, ToastType.WARNING, title, duration);
  }

  // Remove a toast by ID
  remove(id: string): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
    this.toastsSubject.next([...this.toasts]);
  }

  // Clear all toasts
  clear(): void {
    this.toasts = [];
    this.toastsSubject.next([]);
  }

  // Generate a unique ID for a toast
  private generateId(): string {
    return `toast-${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`;
  }
}