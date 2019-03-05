import { Component } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-success-notification',
  templateUrl: './success-notification.component.html',
  styleUrls: ['./success-notification.component.scss']
})
export class SuccessNotificationComponent {
  constructor(
    private snackBarRef: MatSnackBarRef<SuccessNotificationComponent>
  ) {}

  closeNotification() {
    this.snackBarRef.dismissWithAction();
  }
}
