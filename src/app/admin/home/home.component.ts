import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { RegisterDialogComponent} from '../dialogs/home/register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../dialogs/home/login-dialog/login-dialog.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    constructor(public dialog: MatDialog) {

    }
    openRegisterDialog(): void {
        this.dialog.open(RegisterDialogComponent);
    }

    openLoginDialog(): void {
        this.dialog.open(LoginDialogComponent);
    }

}