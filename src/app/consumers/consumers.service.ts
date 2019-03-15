import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { from, combineLatest } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { AuthService } from '@services/auth/auth.service';
import { SnackBarService } from '@services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumersService {
  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private sbs: SnackBarService
  ) {}

  addFavorite(barId: string) {
    this.auth
      .getUserAsConsumerAuth()
      .pipe(
        take(1),
        switchMap(user => {
          return from(
            this.db.collection(`users/${user.uid}/favorites`).add({ barId })
          );
        })
      )
      .subscribe(
        () =>
          this.sbs.openSuccess('Bar successfully added to favorites.', 3000), // success
        error => this.sbs.openError(error.message, 3000) // error
      );
  }

  removeFavorite(barId: string) {
    this.auth
      .getUserAsConsumerAuth()
      .pipe(
        take(1),
        switchMap(user => {
          return this.db
            .collection(`users/${user.uid}/favorites`, ref =>
              ref.where('barId', '==', barId)
            )
            .snapshotChanges()
            .pipe(
              take(1),
              switchMap(result => {
                return combineLatest(
                  ...result.map(obj => {
                    return from(
                      this.db
                        .doc(
                          `users/${user.uid}/favorites/${obj.payload.doc.id}`
                        )
                        .delete()
                    );
                  })
                );
              })
            );
        })
      )
      .subscribe(
        () =>
          this.sbs.openSuccess(
            'Bar successfully removed from favorites.',
            3000
          ), // success
        error => this.sbs.openError(error.message, 3000) // error
      );
  }
}
