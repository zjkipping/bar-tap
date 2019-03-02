import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { RouteAuthData } from '@types';

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
      map(user => !!user === data.requiredAuthState),
      tap(shouldActivate => {
        if (!shouldActivate) {
          this.router.navigate(data.redirect);
        }
      })
    );
  }
}
