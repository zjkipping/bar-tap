import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Drink, RawBar, RawDrink } from 'src/app/types';
import { BarTapApi } from '@api';
import { from } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminDrinksService {

  constructor(private fs: AngularFirestore,
              private bt: BarTapApi,
              private auth: AuthService) { }

  getDrinks(barId: string){
      return from(this.bt.getBarDrinks(barId));
  }

  updateDrinkList(barId: string, drinkUid: string, drink: RawDrink){
   
        return this.fs.doc('bars/' + barId + '/drinks/' + drinkUid).update(drink);

  }

  deleteDrink(barId: string, drinkUid: string){
    return this.fs.doc('bars/' + barId + '/drinks/' + drinkUid).delete();
  }

  addDrink(barId: string, drink: Drink){
    /*this.auth.getUserAsAdminAuth().pipe(
      switchMap(bar => {
        return this.fs.collection(`bars/${bar.barId}/drinks`).add(drink);
      })
    ).subscribe(() => console.log("It worked!"));*/
    
      return this.fs.collection('bars/' + barId + '/drinks').add({
        name: drink.name,
        description: drink.description,
        type: drink.type,
        price: drink.price,
        popular: false}
      );
      
  }
}


