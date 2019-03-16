import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '@services/auth/auth.service';
import { CONSUMER_USER_TYPE } from '@constants';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  password2 = new FormControl('', Validators.required);
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterDialogComponent>
  ) {}

  register() {
    if (this.password.value !== this.password2.value) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.auth
      .registerWithEmail(this.email.value, this.password.value)
      .subscribe(
        res => {
          const user = res.user as firebase.User;
          const email = user.email as string;
          const uid = user.uid as string;

          this.auth.createUserEntry(
            uid,
            email,
            this.firstName.value,
            this.lastName.value,
            CONSUMER_USER_TYPE
          );

          this.router.navigate(['', 'bars']);
          this.dialogRef.close();
        },
        err => {
          this.errorMessage = err.message;
        }
      );
  }
}
