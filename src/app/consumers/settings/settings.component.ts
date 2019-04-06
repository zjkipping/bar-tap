import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { MatDialog } from '@angular/material';
import { switchMap, filter, take } from 'rxjs/operators';
import * as moment from 'moment';

import { PaymentMethod, ConsumerUser } from '@types';
import { BarTapApi } from '@api';
import { PersonalDialogComponent } from '../dialogs/settings/personal-dialog/personal-dialog.component';
import { BillingDialogComponent } from '../dialogs/settings/billing-dialog/billing-dialog.component';
import { EditCardDialogComponent } from '../dialogs/settings/card-dialog/edit-card-dialog.component';
import { AddCardDialogComponent } from '../dialogs/settings/add-card-dialog/add-card-dialog.component';
import { AuthService } from '@services/auth/auth.service';
import { SnackBarService } from '@services/snackbar/snackbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  user: Observable<ConsumerUser>;
  cards: Observable<PaymentMethod[]>;
  selectDisabled = true;

  constructor(
    public auth: AuthService,
    private api: BarTapApi,
    public dialog: MatDialog,
    private db: AngularFirestore,
    private sbs: SnackBarService
  ) {
    this.user = auth.getUserAsConsumerAuth();
    this.cards = this.user.pipe(
      switchMap(user => this.api.getUserPaymentMethods(user.uid))
    );
  }

  openPersonalDialog() {
    this.dialog
      .open(PersonalDialogComponent)
      .afterClosed()
      .pipe(
        filter(data => !!data),
        switchMap(data => {
          data.dob = moment(data.dob).valueOf();
          return this.auth.getUserAsConsumerAuth().pipe(
            take(1),
            switchMap(user => {
              return from(this.db.doc(`/users/${user.uid}`).update(data));
            })
          );
        })
      )
      .subscribe(
        () => {
          this.sbs.openSuccess(
            `Personal Information updated succesfully.`,
            3000
          );
        },
        () => {
          this.sbs.openError(
            `Error. Something went wrong, please try again later.`,
            3000
          );
        }
      );
  }

  openBillingDialog() {
    this.dialog
      .open(BillingDialogComponent)
      .afterClosed()
      .pipe(
        filter(data => !!data),
        switchMap(data => {
          return this.auth.getUserAsConsumerAuth().pipe(
            take(1),
            switchMap(user => {
              return from(
                this.db.doc(`/users/${user.uid}`).update({ billingInfo: data })
              );
            })
          );
        })
      )
      .subscribe(
        () => {
          this.sbs.openSuccess(
            `Billing Information updated succesfully.`,
            3000
          );
        },
        () => {
          this.sbs.openError(
            `Error. Something went wrong, please try again later.`,
            3000
          );
        }
      );
  }

  openAddCardDialog() {
    this.dialog
      .open(AddCardDialogComponent)
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

  openEditCardDialog(card: PaymentMethod) {
    this.dialog
      .open(EditCardDialogComponent, { data: card })
      .afterClosed()
      .pipe(
        filter(data => !!data),
        switchMap(data => {
          return this.auth.getUserAsConsumerAuth().pipe(
            take(1),
            switchMap(user => {
              return from(
                this.db
                  .doc(`/users/${user.uid}/paymentMethods/${card.uid}`)
                  .update(data)
              );
            })
          );
        })
      )
      .subscribe(
        () => {
          this.sbs.openSuccess(`Payment Method updated succesfully.`, 3000);
        },
        () => {
          this.sbs.openError(
            `Error. Something went wrong, please try again later.`,
            3000
          );
        }
      );
  }
}
