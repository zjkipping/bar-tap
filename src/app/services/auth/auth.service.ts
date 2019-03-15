import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of, combineLatest, throwError } from 'rxjs';
import { shareReplay, switchMap, pairwise, map, first } from 'rxjs/operators';

import { BaseUser, EmployeesUser, ConsumerUser, RawUser } from '@types';
import { isEmployeesUser, isConsumerUser } from '@type-guards';
import { NO_AUTH_ERROR, WRONG_USER_TYPE_ERROR, EMPLOYEES_USER_TYPE, CONSUMER_USER_TYPE } from '@constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<BaseUser | undefined>;
  currentAuth: Observable<firebase.User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private database: AngularFirestore
  ) {
    this.currentAuth = afAuth.user;

    this.user = this.currentAuth.pipe(
      switchMap((auth: firebase.User | null) => {
        if (auth) {
          return this.database
            .collection('users')
            .doc<RawUser>(auth.uid)
            .valueChanges()
            .pipe(
              map(user => {
                if (user) {
                  return {
                    ...user,
                    uid: auth.uid
                  };
                } else {
                  return undefined;
                }
              })
            );
        } else {
          return of(undefined);
        }
      }),
      shareReplay(1)
    );
  }

  getUserAsEmployeeAuth(): Observable<EmployeesUser> {
    return this.user.pipe(
      switchMap(user => {
        if (isEmployeesUser(user)) {
          return of(user);
        } else if (!user) {
          return throwError({
            type: NO_AUTH_ERROR,
            message: 'User is not authenticated'
          });
        } else {
          return throwError({
            type: WRONG_USER_TYPE_ERROR,
            message: 'User is not of type: ' + EMPLOYEES_USER_TYPE
          });
        }
      })
    );
  }

  getUserAsConsumerAuth(): Observable<ConsumerUser> {
    return this.user.pipe(
       switchMap(user => {
         if (isConsumerUser(user)) {
           return of(user);
         } else if (!user) {
           return throwError({type: NO_AUTH_ERROR, message: 'User is not authenticated'});
         } else {
           return throwError({type: WRONG_USER_TYPE_ERROR, message: 'User is not of type: ' + CONSUMER_USER_TYPE});
         }
       })
     );
   }

  loginWithEmail(email: string, password: string) {
    return combineLatest(
      from(this.afAuth.auth.signInWithEmailAndPassword(email, password)),
      this.user.pipe(pairwise(), first())
    );
  }

  registerWithEmail(email: string, password: string) {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  createUserEntry(
    uid: string,
    email: string,
    firstName: string,
    lastName: string,
    type: string
  ) {
    this.database.doc('users/' + uid).set({
      firstName,
      lastName,
      email,
      type
    });
  }

  logout() {
    return from(this.afAuth.auth.signOut());
  }
}
