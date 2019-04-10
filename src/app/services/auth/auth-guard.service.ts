import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
        if (data) {
          if (data.requireAuthCheck && data.authState !== !!user) {
            if (data.redirect) {
              this.router.navigate(data.redirect);
            }
            return false;
          }
          if (!!user && data.userType && data.userType !== user.type) {
            if (user.type === EMPLOYEES_USER_TYPE) {
              this.router.navigate(['employees']);
            } else if (user.type === OWNER_USER_TYPE) {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['']);
            }
            return false;
          }
        }
        return true;
      })
    );
  }
}
