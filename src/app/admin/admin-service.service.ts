import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Employee, Bar, SettingsFormData, HoursFormData } from '@types';
import { BarTapApi } from 'src/common/bar-tap-api/bar-tap-api';
import { AuthService } from '@services/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { SnackBarService } from '@services/snackbar/snackbar.service';
import { from, combineLatest } from 'rxjs';

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
  updateSettings(data: SettingsFormData, _barId: string) {
    this.auth.getUserAsAdminAuth().pipe(
      switchMap(bar => {
        return combineLatest(
          this.database.doc(`bars/${bar.barId}`).update({
            name: data.meta.name,
            description: data.meta.description,
            location: data.meta.location
          }),
          this.database.doc(`stripe_api_keys/${bar.barId}`).set({
            apiKey: data.apiKey
          }),
          this.database.doc(`stripe_secrets/${bar.barId}`).set({
            secret: data.secret
          })
        );
      })
    ).subscribe(
      () =>
        this.sbs.openSuccess("Settings updated successfully!", 3000),
        error => this.sbs.openError(error.message, 3000)
    );
  }

  updateHourSettings(data: HoursFormData,) {
    this.auth.getUserAsAdminAuth().pipe(
      switchMap(user => {
        return this.database.doc(`bars/${user.barId}`).update({
          hours: {
            sunday: data.sunday,
            monday: data.monday,
            tuesday: data.tuesday,
            wednesday: data.wednesday,
            thursday: data.thursday,
            friday: data.friday,
            saturday: data.saturday
          }
        });
      })
    ).subscribe(
      () =>
        this.sbs.openSuccess("Settings updated successfully!", 3000),
        error => this.sbs.openError(error.message, 3000)
    );
  }



}
