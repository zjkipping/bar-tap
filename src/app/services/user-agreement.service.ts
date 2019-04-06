import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import { UserAgreementComponent } from '../consumers/dialogs/menu/user-agreement/user-agreement.component';

@Injectable({
  providedIn: 'root'
})
export class UserAgreementService implements CanActivate {
  constructor(public dialog: MatDialog) {}

  canActivate(next: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
    this.dialog
      .open(UserAgreementComponent)
      .afterClosed()
      .pipe(map(data => !!data));
    return false;
  }
}
