import { Component } from '@angular/core';
import { Drink, Bar, AdminUser } from 'src/app/types';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { BarTapApi } from '@api';
import { AdminDrinksService } from '@services/drink/admin-drinks.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditDrinkDialogComponent } from '../dialogs/edit-drink-dialog/edit-drink-dialog.component';
import { switchMap, filter, take, tap } from 'rxjs/operators';
import { DeleteDrinkDialogComponent } from '../dialogs/delete-drink-dialog/delete-drink-dialog.component';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})

//Test Bar Data Firebase ID: rDdQClImI6N4RtQVuGGO

export class DrinksComponent {

  details: FormGroup;
  name = new FormControl('', [Validators.required])
  price = new FormControl(0, [Validators.required])
  description = new FormControl('', [Validators.required])
  type = new FormControl('', [Validators.required])

  displayedColumns: string[] = ['name', 'price', 'description', 'type', 'edit', 'delete'];
  drinksArray?: Observable<Drink[]>
  user: Observable<AdminUser>;

  constructor(fb: FormBuilder,
      private db: AngularFirestore,
      private bt: BarTapApi,
      private ad: AdminDrinksService,
      private ds: AdminDrinksService,
      private dialog: MatDialog,
      private auth: AuthService) {
    this.details = fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required]
    })

      this.user = this.auth.getUserAsAdminAuth();
      this.user.pipe(
         switchMap(user => this.drinksArray = bt.getBarDrinks(user.barId))
      )
      .subscribe(
         () => console.log('drink list pulled'),
         error => console.log('drink list not pulled')
      );
   }

   save(){
      this.user.pipe(
         take(1),
         switchMap(user=> {
            return this.ds.addDrink(user.barId, {
               uid: '1', 
               name: this.name.value, 
               price: this.price.value, 
               description: this.description.value, 
               type: this.type.value,
               popular: false})
         })
      )
      .subscribe(
         () => console.log('save', this.name.value),
         error => console.log('drink not saved')
      );
   }

   edit(drink: Drink){
      this.dialog.open(EditDrinkDialogComponent, {data: drink}).afterClosed().pipe(
         filter(result => !!result),
         switchMap(editedDrink => {
            return this.user.pipe(
               take(1),
               switchMap(user => this.ds.updateDrinkList(user.barId, drink.uid, editedDrink))
            );
         }),
       ).subscribe(editDrink => console.log("win"));
       //bar => this.ds.updateDrinkList(bar.barId, drink.uid, drink)
   }
   
   delete(drink: Drink){
      console.log('delete button pushed');

      this.dialog.open(DeleteDrinkDialogComponent).afterClosed().pipe(
         filter(deletedDrink => !!deletedDrink),
         switchMap(deletedDrink => {
            return this.user.pipe(
               take(1),
               switchMap(user => this.ds.deleteDrink(user.barId, drink.uid))
            );
         }),
         tap(result => console.log(result))
       ).subscribe(
         () => console.log('delete success'),
         error => console.log('delete failure')
       );

       /*this.dialog
         .open(DeleteDrinkDialogComponent, {data: drink})
         .afterClosed()
         .pipe( 
            filter(deletedDrink => !!deletedDrink),
            switchMap( deletedDrink => {
               return from(this.ds.deleteDrink(this.barId, drink.uid))})
            )
         .subscribe(
            () => console.log("Yes!"),
            error => console.log("No!")
         );*/
   }
}



