import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PaymentMethod } from '@types';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './edit-card-dialog.component.html',
  styleUrls: ['./edit-card-dialog.component.scss']
})
export class EditCardDialogComponent {
  fullName = new FormControl('', Validators.required);
  cardNumber = new FormControl('', Validators.required);
  cvc = new FormControl('', Validators.required);
  expiration = new FormControl('', Validators.required);
  errorMessage = '';
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public card: PaymentMethod
  ) {
    this.fullName.setValue(this.card.fullName);
    this.expiration.setValue(this.card.expiration);
    this.cvc.setValue(this.card.cvc);
    this.cardNumber.setValue(this.card.cardNumber);
  }

  save() {
    this.dialogRef.close({
      firstName: this.fullName.value,
      cardNumber: this.cardNumber.value,
      cvc: this.cvc.value,
      expiration: this.expiration.value
    });
  }

  delete() {
    this.dialogRef.close({
      delete: true
    });
  }
}
