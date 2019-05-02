import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth/auth.service';
import { CONSUMER_USER_TYPE } from '@constants';
import { UserAgreementComponent } from '../../menu/user-agreement/user-agreement.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  dob = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  password2 = new FormControl('', Validators.required);
  errorMessage = '';
  showLoading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  register() {
    this.errorMessage = '';
    this.showLoading = true;

    if (this.password.value !== this.password2.value) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const date = moment().subtract('years', 21);

    if (!moment(this.dob.value).isSameOrBefore(date, 'day')) {
      this.showLoading = false;
      this.errorMessage = 'You must be 21 years of age to register an account.';
      return;
    }

    this.dialog
      .open(UserAgreementComponent)
      .afterClosed()
      .subscribe(data => {
        if (!data.continue) {
          this.showLoading = false;
          this.errorMessage =
            "You must agree to Bar Tap's User Agreement before registering an account.";
          return;
        } else {
          this.auth
            .registerWithEmail(this.email.value, this.password.value)
            .subscribe(
              res => {
                const user = res.user as firebase.User;
                const email = user.email as string;
                const dob = new Date(this.dob.value);
                const uid = user.uid as string;

                this.auth.createUserEntry(
                  uid,
                  email,
                  this.firstName.value,
                  this.lastName.value,
                  dob,
                  CONSUMER_USER_TYPE
                );

                this.router.navigate(['', 'bars']);

                if (this.data) {
                  this.dialogRef.close({
                    data: {
                      newUser: true
                    }
                  });
                } else {
                  this.dialogRef.close();
                }
              },
              err => {
                this.errorMessage = err.message;
                this.showLoading = false;
              }
            );
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}
