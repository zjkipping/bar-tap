import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { Drink } from '@types';
import { AddToCartComponent } from '../../../dialogs/menu/add-to-cart/add-to-cart.component';
import { BarTapApi } from '@api';

@Component({
  selector: 'app-drinks-panel',
  templateUrl: './drinks-panel.component.html',
  styleUrls: ['./drinks-panel.component.scss']
})
export class DrinksPanelComponent implements OnInit {
  @Input() type?: string;
  @Input() title?: string;
  @Input() color?: string;
  @Input() barUid?: string;

  drinks?: Observable<Drink[]>;

  constructor(private dialog: MatDialog, private api: BarTapApi) { }

  ngOnInit() {
    if (this.type && this.barUid) {
      this.drinks = this.api.getBarDrinksByType(this.barUid, this.type.toLowerCase());
    }
  }

  openAddToCartDialog(drink: Drink) {
    this.dialog.open(AddToCartComponent, {
      data: drink
    });
  }
}
