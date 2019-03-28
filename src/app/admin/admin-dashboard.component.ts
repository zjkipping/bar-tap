import { Component } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LogoutDialogComponent } from './dialogs/home/logout-dialog/logout.dialog.component';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseUser } from '@types';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  user: Observable<BaseUser | undefined>;
  constructor(
    public auth: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) { 
    this.user = auth.user;
  }
  openLogoutDialog() {
    this.dialog
      .open(LogoutDialogComponent)
      .afterClosed()
      .pipe(
        filter(res => !!res),
        switchMap(() => this.auth.logout())
      )
      .subscribe(() => {
        this.router.navigate(['admin', '']);
      });
  }
}
