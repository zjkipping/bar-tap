import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { BarTapApi } from '@api';
import { AuthService } from '@services/auth/auth.service';
import { Bar } from '@types';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favorites: Observable<Bar[]>;

  constructor(private auth: AuthService, private api: BarTapApi) {
    this.favorites = this.auth.getUserAsConsumerAuth().pipe(
      switchMap(user => api.getConsumersFavoriteBars(user.uid))
    );
  }
 }
