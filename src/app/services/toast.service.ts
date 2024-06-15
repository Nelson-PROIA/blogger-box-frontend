import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  showSuccessToast(message: string): void {
    this.showToast(message, 'success');
  }

  showErrorToast(message: string): void {
    this.showToast(message, 'error');
  }

  showToast(message: string, type: SweetAlertIcon): void {
    Swal.fire({
        icon: type,
        toast: true,
        html: `<div style="max-height: 75px; overflow-y: auto;">${message}</div>`,
        width: '26em',
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 6000,
        timerProgressBar: true,
        showCloseButton: true,
        didOpen: (toast) => {
          toast.addEventListener('click', () => Swal.close());
        }
      });
  }

}
