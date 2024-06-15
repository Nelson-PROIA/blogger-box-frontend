import { Component, OnInit } from '@angular/core';
import { ConfirmationModalService } from '../../services/confirmation-modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  title!: string;
  message!: string;
  confirmationButtonText!: string;
  buttonType!: string;

  constructor(private confirmationModalService: ConfirmationModalService) {}

  ngOnInit(): void {
    this.confirmationModalService.confirmationRequested$.subscribe(({ title, message, confirmationButtonText, buttonType }) => {
      this.title = title;
      this.message = message;
      this.confirmationButtonText = confirmationButtonText;
      this.buttonType = buttonType;
    });
  }

  confirm() {
    this.confirmationModalService.confirm(true);
  }

  cancel() {
    this.confirmationModalService.confirm(false);
  }

}
