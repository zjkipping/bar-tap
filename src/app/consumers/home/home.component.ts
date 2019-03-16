import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../dialogs/home/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../dialogs/home/register-dialog/register-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public dialog: MatDialog) {}

  openRegisterDialog(): void {
    this.dialog.open(RegisterDialogComponent);
  }

  openSignInDialog(): void {
    this.dialog.open(LoginDialogComponent);
  }
}
