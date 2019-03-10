import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { BaseUser } from '@types';
import { isEmployeesUser } from '@type-guards';
import { EMPLOYEES_USER_TYPE, NO_AUTH_ERROR, WRONG_USER_TYPE_ERROR } from '@constants';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarTapApi } from '@api';

export const fetchDataAsEmployee = <T>(
  api: BarTapApi,
  db: AngularFirestore,
  user: Observable<BaseUser | undefined>,
  fn: (barID: string, ...args: any[]) => Observable<T>,
  ...args: any[]
): Observable<T> => {
  return user.pipe(
    switchMap(user => {
      if (isEmployeesUser(user)) {
        return fn.bind(api)(user.barId, ...args);
      } else if (!user) {
        return throwError({type: NO_AUTH_ERROR, message: 'User is not authenticated'});
      } else {
        return throwError({type: WRONG_USER_TYPE_ERROR, message: 'User is not of type: ' + EMPLOYEES_USER_TYPE});
      }
    })
  );
}
