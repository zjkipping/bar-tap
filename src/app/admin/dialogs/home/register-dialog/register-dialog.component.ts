import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '@services/auth/auth.service';
import { OWNER_USER_TYPE } from '@constants';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})

export class RegisterDialogComponent {
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  barName = new FormControl('', [Validators.required]);
  password = new FormControl('', Validators.required);
  password2 = new FormControl('', Validators.required);
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private database: AngularFirestore,
    private dialogRef: MatDialogRef<RegisterDialogComponent>
  ) { }

  register() {
    if (this.password.value !== this.password2.value) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.auth.registerWithEmail(this.email.value, this.password.value).pipe(
      switchMap(res => {
        const user = res.user as firebase.User;
        const email = user.email as string;
        const uid = user.uid as string;
        return this.auth.createAdminUserEntry(
          uid,
          email,
          this.firstName.value,
          this.lastName.value,
          OWNER_USER_TYPE
        ).pipe(
          switchMap(() => from(this.database.collection(`bars`).add({ name: this.barName.value }))),
          switchMap(bar => from(this.database.doc(`users/${uid}`).update({
            barId: bar.id
          })))
        );
      })
    )
      .subscribe(
        _res => {
          this.router.navigate(['admin', 'analytics']);
          this.dialogRef.close();
        },
        err => {
          this.errorMessage = err.message;
        }
      );
  }
}
