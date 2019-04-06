import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.scss']
})
export class UserAgreementComponent {
  constructor(private dialogRef: MatDialogRef<UserAgreementComponent>) {}

  continue(value: boolean) {
    this.dialogRef.close({
      data: {
        continue: value
      }
    });
  }
}
