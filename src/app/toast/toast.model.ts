// toast.model.ts
export enum ToastType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning'
  }
  
  export interface Toast {
    id?: string;
    message: string;
    type: ToastType;
    title?: string;
    duration?: number;
  }