import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { BarTapApi } from '@api';
import { Drink, DrinkData } from '@types';

@Component({
  selector: 'app-order-drink-info',
  templateUrl: './order-drink-info.component.html',
  styleUrls: ['./order-drink-info.component.scss']
})
export class OrderDrinkInfoComponent implements OnInit {
 @Input() drinkData?: DrinkData;

  testBarID = 'rDdQClImI6N4RtQVuGGO';
  drink?: Observable<Drink | undefined>;

  constructor(private bt: BarTapApi) { }

  ngOnInit() {
    if (this.drinkData) {
      this.drink = this.bt.getBarDrink(this.testBarID, this.drinkData.id);
    }
  }

}
