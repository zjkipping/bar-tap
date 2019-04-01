import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { RouteAuthData } from '@types';
import { EMPLOYEES_USER_TYPE, OWNER_USER_TYPE } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    const data = next.data as RouteAuthData;
    return this.auth.user.pipe(
      map(user => {
        if (!!user !== data.requiredAuthState) {
          this.router.navigate(data.redirect);
          return false;
        } else if (!!user) {
          if (!data.userType || (data.userType && user.type === data.userType)) {
            return true;
          } else {
            if (user.type === EMPLOYEES_USER_TYPE) {
              this.router.navigate(['employees']);
            } else if (user.type === OWNER_USER_TYPE) {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['']);
            }
            return false;
          }
        } else {
          return true;
        }
      })
    );
  }
}
