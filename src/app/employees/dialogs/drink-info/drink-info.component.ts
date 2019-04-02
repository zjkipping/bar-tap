import { Component, Input } from '@angular/core';

import { DrinkData } from '@types';

@Component({
  selector: 'app-drink-info',
  templateUrl: './drink-info.component.html',
  styleUrls: ['./drink-info.component.scss']
})
export class DrinkInfoComponent {
  @Input('drink') data?: DrinkData;
}
