import { Component } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { LogoutDialogComponent } from './dialogs/home/logout-dialog/logout-dialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BaseUser } from '@types';

@Component({
  selector: 'app-consumers-dashboard',
  templateUrl: './consumers-dashboard.component.html',
  styleUrls: ['./consumers-dashboard.component.scss']
})
export class ConsumersDashboardComponent {
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
        this.router.navigate(['', '']);
      });
  }
}
