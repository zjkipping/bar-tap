import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Tracking, ConsumerUser, Bar } from '@types';
import { AuthService } from '@services/auth/auth.service';
import { BarTapApi } from '@api';
import { switchMap, combineLatest } from 'rxjs/operators';

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
    this.tracking.subscribe(data => console.log(data));
  }
}
/* 
  Need bar name and total price
*/
