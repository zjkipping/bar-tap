import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Employee, Bar } from '@types';
import { BarTapApi } from 'src/common/bar-tap-api/bar-tap-api';
import { AuthService } from '@services/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { SnackBarService } from '@services/snackbar/snackbar.service';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private database: AngularFirestore,
    private barApi: BarTapApi,
    private auth: AuthService,
    private sbs: SnackBarService
  ) { }

  /* EMPLOYEES PAGE */
  getEmployees(barId: string) {
    return from(this.barApi.getBarEmployees(barId));
  }

  createEmployee(data: Employee, _barId: string) {
    this.auth.getUserAsAdminAuth().pipe(
      switchMap(bar => {
        return this.database.collection(`bars/${bar.barId}/employees`).add(data);
      })
    )
    .subscribe(
      () => 
        this.sbs.openSuccess("Employee added successfully!", 3000),
        error => this.sbs.openError(error.message, 3000)
    );
  }
  updateEmployee(data: Employee, _barId: string, employeeId: string) {
    this.auth.getUserAsAdminAuth().pipe(
      switchMap(bar => {
        return this.database.doc(`bars/${bar.barId}/employees/${employeeId}`).set(data);
      })
    )
    .subscribe(
      () => 
        this.sbs.openSuccess("Employee updated successfully!", 3000),
        error => this.sbs.openError(error.message, 3000)
    );
  }

  deleteEmployee(barId: string, employeeId: string) {
    return from(this.database.doc(`bars/${barId}/employees/${employeeId}`).delete());
  }

  /* SETTINGS PAGE */
  updateSettings(data: Bar, _barId: string) {
    this.auth.getUserAsAdminAuth().pipe(
      switchMap(bar => {
        return this.database.doc(`bars/${bar.barId}`).update({
          name: data.name,
          description: data.description,
          location: data.location,
          hours: data.hours
        });
      })
    ).subscribe(
      () =>
        this.sbs.openSuccess("Settings updated successfully!", 3000),
        error => this.sbs.openError(error.message, 3000)
    );
  }

}
