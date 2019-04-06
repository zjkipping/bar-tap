import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ExpandedDrinkData, Bar, Order } from '@types';
import { EmployeesService } from 'src/app/employees/employees.service';
import { BarTapApi } from '@api';

@Component({
  selector: 'app-tracker-order-panel',
  templateUrl: './tracker-order-panel.component.html',
  styleUrls: ['./tracker-order-panel.component.scss']
})
export class TrackerOrderPanelComponent implements OnInit {
  @Input() barId?: string;
  @Input() order?: Order;
  bar?: Observable<Bar | undefined>;
  drinkData?: Observable<ExpandedDrinkData[]>;
  constructor(
    private employeeService: EmployeesService,
    private api: BarTapApi
  ) {}

  ngOnInit() {
    if (this.barId && this.order) {
      this.bar = this.api.getBar(this.barId);
      this.drinkData = this.employeeService.getDrinksFromIDs(
        this.order.drinks,
        this.barId
      );
    }
  }
}
