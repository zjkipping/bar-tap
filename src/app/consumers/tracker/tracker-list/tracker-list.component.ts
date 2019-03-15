import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Bar, Order } from '@types';
import { BarTapApi } from '@api';

@Component({
  selector: 'app-tracker-list',
  templateUrl: './tracker-list.component.html',
  styleUrls: ['./tracker-list.component.scss']
})
export class TrackerListComponent implements OnInit {
  @Input() barId?: string;
  @Input() orderId?: string;

  bar?: Observable<Bar | undefined>;
  order?: Observable<Order | undefined>;

  constructor(private api: BarTapApi) {}

  ngOnInit() {
    if (this.barId && this.orderId) {
      this.bar = this.api.getBar(this.barId);
      this.order = this.api.getBarOrder(this.barId, this.orderId);
    }
  }
}
