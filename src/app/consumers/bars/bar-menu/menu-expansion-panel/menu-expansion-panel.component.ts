import { Component, Input, OnInit } from '@angular/core';
import { Drink } from '@types';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddToCartComponent } from 'src/app/consumers/dialogs/menu/add-to-cart/add-to-cart.component';
import { BarTapApi } from '@api';

@Component({
  selector: 'app-menu-expansion-panel',
  templateUrl: './menu-expansion-panel.component.html',
  styleUrls: ['./menu-expansion-panel.component.scss']
})
export class MenuExpansionPanelComponent implements OnInit {
  @Input() type?: string;
  @Input() title?: string;
  @Input() barUid?: string;
  drinks?: Observable<Drink[]>;
  constructor(public dialog: MatDialog, private api: BarTapApi) {
    
  }
 
  ngOnInit() {
   if(this.type && this.barUid){
    this.drinks = this.api.getBarDrinksByType(this.barUid, this.type.toLowerCase());
   }
  }
  openAddToCartDialog(drink: Drink) {
    this.dialog.open(AddToCartComponent, {
      data: drink
    });
  }
}
