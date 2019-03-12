import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DrinksComponent } from 'src/app/admin/drinks/drinks.component';
import { Drink } from '@types';

@Component({
  selector: 'app-edit-drink-dialog',
  templateUrl: './edit-drink-dialog.component.html',
  styleUrls: ['./edit-drink-dialog.component.scss']
})
export class EditDrinkDialogComponent implements OnInit {

  details: FormGroup;
  
  constructor(private dr: MatDialogRef<DrinksComponent>,
              @Inject(MAT_DIALOG_DATA) data: Drink,
              fb: FormBuilder) {
                  this.details = fb.group({
                      name: [data.name, Validators.required],
                      price: [data.price, Validators.required],
                      description: [data.description, Validators.required],
                      type: [data.type, Validators.required]
                  });
  }

  ngOnInit() {
  }

  edit(){
    this.dr.close(this.details.value);
  }

}
