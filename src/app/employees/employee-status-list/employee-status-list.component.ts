import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AngularFireFunctions } from '@angular/fire/functions';
import { filter, switchMap } from 'rxjs/operators';

import { EmployeClockerDialogComponent } from '../dialogs/employee-clocker/employee-clocker-dialog.component';
import { SnackBarService } from '@services/snackbar/snackbar.service';
import { Employee, EmployeeLogin, FirebaseCloudFunction, EmployeeCheckInOutData } from '@types';

@Component({
  selector: 'app-employee-status-list',
  templateUrl: './employee-status-list.component.html',
  styleUrls: ['./employee-status-list.component.scss']
})
export class EmployeeStatusListComponent {
  @Input() employees?: Employee[];
  @Input() barId?: string;
  checkIn: FirebaseCloudFunction<EmployeeCheckInOutData>;
  checkOut: FirebaseCloudFunction<EmployeeCheckInOutData>;

  constructor(private dialog: MatDialog, private sbs: SnackBarService, functions: AngularFireFunctions) {
    this.checkIn = functions.httpsCallable('employeeCheckIn');
    this.checkOut = functions.httpsCallable('employeeCheckOut');
  }

  signIn() {
    if (this.barId) {
      this.dialog.open(EmployeClockerDialogComponent).afterClosed().pipe(
        filter((login): login is EmployeeLogin => !!login),
        switchMap(login => this.checkIn({...login, barId: this.barId as string }))
      ).subscribe(
        () => this.sbs.openSuccess('Employee checked in successfully!', 5000),
        error => this.sbs.openError(error.message, 5000)
      );
    }
  }

  signOut() {
    if (this.barId) {
      this.dialog.open(EmployeClockerDialogComponent).afterClosed().pipe(
        filter((login): login is EmployeeLogin => !!login),
        switchMap(login => this.checkOut({...login, barId: this.barId as string }))
      ).subscribe(
        () => this.sbs.openSuccess('Employee checked out successfully!', 5000),
        error => this.sbs.openError(error.message, 5000)
      );
    }
  }
}
