import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '@services/auth/auth.service';
import { BarTapApi } from '@api';
import { History } from '@types';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  history: Observable<History[]>;

  constructor(private auth: AuthService, private api: BarTapApi) {
    this.history = this.auth
      .getUserAsConsumerAuth()
      .pipe(switchMap(user => this.api.getConsumersHistory(user.uid)));
  }
}
