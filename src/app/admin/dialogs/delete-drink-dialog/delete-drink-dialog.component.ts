import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DrinksComponent } from '../../drinks/drinks.component';
import { Drink } from '@types';

@Component({
  selector: 'app-delete-drink-dialog',
  templateUrl: './delete-drink-dialog.component.html',
  styleUrls: ['./delete-drink-dialog.component.scss']
})
export class DeleteDrinkDialogComponent implements OnInit {

  drink?: Drink;

  constructor(private dr: MatDialogRef<DrinksComponent>,
               @Inject(MAT_DIALOG_DATA) data: Drink) {
                 
      this.drink = data;
   }

  ngOnInit() {
  }

  yes(){
    console.log('the dialog closed with a yes');
    this.dr.close(true);
  }

  cancel(){
    console.log('the dialog closed with a cancel');
    this.dr.close();
  }
}
