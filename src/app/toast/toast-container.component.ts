// toast-container.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Toast } from './toast.model';
import { ToastService } from './toast.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toasts; track toast.id) {
        <div class="toast toast-{{toast.type}}" [@fadeInOut]>
          <div class="toast-header">
            <strong>{{toast.title || getDefaultTitle(toast.type)}}</strong>
            <button class="close-btn" (click)="removeToast(toast.id)">×</button>
          </div>
          <div class="toast-body">
            {{toast.message}}
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      margin-right: 18px;
      right: 20px;
      z-index: 1050;
      max-width: 350px;
    }
    
    .toast {
      width: 100%;
      margin-bottom: 10px;
      padding: 15px;
      border-radius: 4px;
      box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.1);
      opacity: 0.95;
      color: #fff;
    }
    
    .toast-success {
      background-color: #28a745;
    }
    
    .toast-error {
      background-color: #dc3545;
    }
    
    .toast-info {
      background-color: #17a2b8;
    }
    
    .toast-warning {
      background-color: #ffc107;
      color: #212529;
    }
    
    .toast-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-weight: bold;
    }
    
    .close-btn {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      color: inherit;
      padding: 0;
      margin-left: 10px;
    }
    
    .toast-body {
      word-wrap: break-word;
    }
  `],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.subscription = this.toastService.getToasts().subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeToast(id?: string): void {
    if (id) {
      this.toastService.remove(id);
    }
  }

  getDefaultTitle(type: string): string {
    switch (type) {
      case 'success': return 'Success';
      case 'error': return 'Error';
      case 'info': return 'Information';
      case 'warning': return 'Warning';
      default: return 'Notification';
    }
  }
}