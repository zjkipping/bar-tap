import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '@services/auth/auth.service';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
  })

  export class LoginDialogComponent {
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', Validators.required);
    errorMessage = '';
  
    constructor(
      private auth: AuthService,
      private router: Router,
      public dialog: MatDialog,
      private dialogRef: MatDialogRef<LoginDialogComponent>
    ) {}
  
    login() {
      this.auth.loginWithEmail(this.email.value, this.password.value).subscribe(
        res => {
          this.router.navigate(['admin', 'analytics']);
          this.dialogRef.close();
        },
        err => {
          this.errorMessage = err.message;
        }
      );
    }
  }
