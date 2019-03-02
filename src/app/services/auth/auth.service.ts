import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of, combineLatest } from 'rxjs';
import { shareReplay, switchMap, pairwise, take, map, first } from 'rxjs/operators';

import { BaseUser } from '@types';

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
    this.currentAuth = afAuth.user.pipe();

    this.user = this.currentAuth.pipe(
      switchMap((auth: firebase.User | null) => {
        if (auth) {
          return this.database.collection('users').doc<BaseUser>(auth.uid).valueChanges();
        } else {
          return of(undefined);
        }
      }),
      shareReplay(1)
    );
  }

  loginWithEmail(email: string, password: string) {
    return combineLatest(
      from(this.afAuth.auth.signInWithEmailAndPassword(email, password)),
      this.user.pipe(pairwise(), first())
    ).pipe(map(([_obj, [_old_user, new_user]]) => new_user));
  }

  logout() {
    return from(this.afAuth.auth.signOut());
  }
}
