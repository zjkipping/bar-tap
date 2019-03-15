import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-billing-dialog',
  templateUrl: './billing-dialog.component.html',
  styleUrls: ['./billing-dialog.component.scss']
})
export class BillingDialogComponent {
  authSubscription?: Subscription;
  name = new FormControl('', Validators.required);
  billingInfo: FormGroup;
  errorMessage = '';

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<BillingDialogComponent>,
    auth: AuthService,
    fb: FormBuilder
  ) {
    this.billingInfo = fb.group({
      name: new FormControl('', Validators.required),
      address_line1: new FormControl('', Validators.required),
      address_line2: new FormControl('', Validators.required),
      address_city: new FormControl('', Validators.required),
      address_state: new FormControl('', Validators.required),
      address_zip: new FormControl('', Validators.required),
      address_country: new FormControl('', Validators.required)
    });
    this.authSubscription = auth.getUserAsConsumerAuth().subscribe(user => {
      take(1),
        this.billingInfo.setValue({
          name: user.firstName + ' ' + user.lastName,
          address_line1: user.billingInfo.address_line1,
          address_line2: user.billingInfo.address_line2,
          address_city: user.billingInfo.address_city,
          address_state: user.billingInfo.address_state,
          address_zip: user.billingInfo.address_zip,
          address_country: user.billingInfo.address_country
        });
    });
  }

  save() {
    this.dialogRef.close(this.billingInfo.value);
  }
}
