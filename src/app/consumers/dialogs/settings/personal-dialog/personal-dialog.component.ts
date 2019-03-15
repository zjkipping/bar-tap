import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

import { AuthService } from '@services/auth/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-personal-dialog',
  templateUrl: './personal-dialog.component.html',
  styleUrls: ['./personal-dialog.component.scss']
})
export class PersonalDialogComponent {
  authSubscription?: Subscription;
  personalForm: FormGroup;
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  dob = new FormControl('', Validators.required);
  errorMessage = '';

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<PersonalDialogComponent>,
    auth: AuthService,
    fb: FormBuilder
  ) {
    this.personalForm = fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required)
    });
    this.authSubscription = auth.getUserAsConsumerAuth().subscribe(user => {
      take(1),
        this.personalForm.setValue({
          firstName: user.firstName,
          lastName: user.lastName,
          dob: new Date(user.dob)
        });
    });
  }
  save() {
    this.dialogRef.close(this.personalForm.value);
  }
}
