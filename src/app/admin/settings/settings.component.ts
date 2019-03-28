import { Component } from '@angular/core';

import { MatDialog } from '@angular/material';
import { EditSettingsComponent } from '../dialogs/settings/edit-settings.component';
import { tap, switchMap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Bar } from '@types';
import { AuthService } from '@services/auth/auth.service';
import { BarTapApi } from '@api';
import { AdminService } from '../admin-service.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})

export class SettingsComponent {
    settings: Observable<Bar | undefined>;
    constructor(
        public dialog: MatDialog,
        private auth: AuthService,
        private api: BarTapApi,
        private as: AdminService
     ) {
        this.settings = this.auth.getUserAsAdminAuth().pipe(
            switchMap(bar => this.api.getBar(bar.barId))
        );
    }

    openSettingsDialog(settings: Bar) {
        this.dialog.open(EditSettingsComponent, {data: settings}).afterClosed().pipe(
            filter(result => !!result),
            tap(result => console.log(result))
        ).subscribe(bar => this.as.updateSettings(bar, bar.barId));
    }
}