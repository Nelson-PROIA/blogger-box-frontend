import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private componentRequestedSource = new Subject<{ component: Type<any>, data?: any }>();

  componentRequested$ = this.componentRequestedSource.asObservable();

  requestComponent(component: Type<any>, data?: any) {
    this.componentRequestedSource.next({ component, data });
  }

  close() {
    document.getElementById('modal-close-button')?.click();
  }
  
}
