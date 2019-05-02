import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tracking, ConsumerUser } from '@types';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '@services/auth/auth.service';
import { BarTapApi } from '@api';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent {
  user: Observable<ConsumerUser>;
  tracking: Observable<Tracking[]>;

  constructor(public auth: AuthService, private api: BarTapApi) {
    this.user = auth.getUserAsConsumerAuth();
    this.tracking = this.user.pipe(
      switchMap(user => this.api.getUserTracking(user.uid))
    );
  }
}
