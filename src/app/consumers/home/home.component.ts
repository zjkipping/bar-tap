import { Component } from '@angular/core';
import { filter, switchMap, take } from 'rxjs/operators';
import { from } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { MatDialog } from '@angular/material';
import { AuthService } from '@services/auth/auth.service';
import { SnackBarService } from '@services/snackbar/snackbar.service';
import { RegisterDialogComponent } from '../dialogs/home/register-dialog/register-dialog.component';
import { AddCardDialogComponent } from '../dialogs/settings/add-card-dialog/add-card-dialog.component';
import { LoginDialogComponent } from '../dialogs/home/login-dialog/login-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public dialog: MatDialog,
    private db: AngularFirestore,
    private auth: AuthService,
    private sbs: SnackBarService
  ) {}

  openRegisterDialog() {
    this.dialog
      .open(RegisterDialogComponent, {
        data: {
          newUser: true
        }
      })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.dialog
            .open(AddCardDialogComponent, {
              data: {
                message: 'Add a card now to speed up your checkout experience.'
              }
            })
            .afterClosed()
            .pipe(
              filter(data => !!data),
              switchMap(data => {
                return this.auth.getUserAsConsumerAuth().pipe(
                  take(1),
                  switchMap(user => {
                    return from(
                      this.db
                        .collection(`/users/${user.uid}/paymentMethods`)
                        .add(data)
                    );
                  })
                );
              })
            )
            .subscribe(
              () => {
                this.sbs.openSuccess(`Payment Method added succesfully.`, 3000);
              },
              () => {
                this.sbs.openError(
                  `Error. Something went wrong, please try again later.`,
                  3000
                );
              }
            );
        }
      });
  }

  openSignInDialog() {
    this.dialog.open(LoginDialogComponent);
  }
}
