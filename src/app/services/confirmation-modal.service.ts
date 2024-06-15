import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {

  private confirmationRequestedSource = new Subject<{ title: string, message: string, confirmationButtonText: string, buttonType: string }>();
  private confirmationResultSource = new Subject<boolean>();

  confirmationRequested$ = this.confirmationRequestedSource.asObservable();
  confirmationResult$ = this.confirmationResultSource.asObservable();

  requestConfirmation(title: string, message: string, confirmationButtonText: string, buttonType: string) {
    this.confirmationRequestedSource.next({ title, message, confirmationButtonText, buttonType });
  }

  confirm(result: boolean) {
    this.confirmationResultSource.next(result);
  }
  
}
