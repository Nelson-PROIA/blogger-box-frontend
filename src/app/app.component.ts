import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { Type } from '@angular/core';
import { WritePostFormComponent } from './components/write-post-form/write-post-form.component';
import { ConfirmationModalComponent } from './components/confirm-modal/confirmation-modal.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blogger-box-frontend';
}
