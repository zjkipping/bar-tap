import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee-clocker-dialog',
  templateUrl: './employee-clocker-dialog.component.html',
  styleUrls: ['./employee-clocker-dialog.component.scss']
})
export class EmployeClockerDialogComponent {
  id = new FormControl('', Validators.required);
  pin = new FormControl('', Validators.required);

  constructor(private dialogRef: MatDialogRef<EmployeClockerDialogComponent>) {

  }

  submit() {
    this.dialogRef.close({ id: this.id.value, pin: this.pin.value });
  }
}
