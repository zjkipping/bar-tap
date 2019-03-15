import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss']
})
export class AddCardDialogComponent {
  cardNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(16)
  ]);
  cvc = new FormControl('', [Validators.required, Validators.minLength(3)]);
  expiration = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  errorMessage = '';

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddCardDialogComponent>
  ) {}

  save() {
    if (/^\d{2}\/\d{2}$/.test(this.expiration.value)) {
      this.dialogRef.close({
        cardNumber: this.cardNumber.value,
        cvc: this.cvc.value,
        expiration: this.expiration.value
      });
    } else {
      this.errorMessage = 'Invalid expiration date, enter as MM/YY.';
    }
  }
}
