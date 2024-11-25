import { Injectable } from '@angular/core';
import { ToastComponent } from '../../shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastComponent!: ToastComponent;

  setToastComponent(component: ToastComponent) {
    this.toastComponent = component;
  }

  showSuccess(message: string): void {
    this.toastComponent.addToast(message, 'success');
  }

  showError(message: string): void {
    this.toastComponent.addToast(message, 'error');
  }

  showWarning(message: string): void {
    this.toastComponent.addToast(message, 'warning');
  }
}
