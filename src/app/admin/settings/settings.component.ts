import { Component, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material';
import { EditSettingsComponent } from '../dialogs/settings/edit-settings.component';
import { tap, switchMap, filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Bar, SettingsFormData, HoursFormData } from '@types';
import { AuthService } from '@services/auth/auth.service';
import { BarTapApi } from '@api';
import { AdminService } from '../admin-service.service';
import { EditHoursComponent } from '../dialogs/hours/edit-hours.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnDestroy {
    show= {};
    settings: Observable<Bar | undefined>;
    barApiKey: string | undefined;
    stripeSecret: string | undefined;
    killSubs = new Subject();
    constructor(
        public dialog: MatDialog,
        private auth: AuthService,
        private api: BarTapApi,
        private as: AdminService
     ) {
        this.settings = this.auth.getUserAsAdminAuth().pipe(
            switchMap(bar => this.api.getBar(bar.barId)),
        );
        this.auth.getUserAsAdminAuth().pipe(
            switchMap(bar => this.api.getBarApiKey(bar.barId)),
            takeUntil(this.killSubs)
        ).subscribe(res => this.barApiKey = res);

        this.auth.getUserAsAdminAuth().pipe(
            switchMap(bar => this.api.getBarStripeSecret(bar.barId)),
            takeUntil(this.killSubs)
        ).subscribe(res => this.stripeSecret = res);
    }

    ngOnDestroy() {
        this.killSubs.next();
        this.killSubs.complete();
    }

    openSettingsDialog(settings: Bar, barApiKey: string, stripeSecret: string) {
        var details: SettingsFormData = {
            meta: {
                name: settings.name,
                description: settings.description,
                location: settings.location
            },
            apiKey: barApiKey,
            secret: stripeSecret
        }
        this.dialog.open(EditSettingsComponent, {data: details}).afterClosed().pipe(
            filter(result => !!result),
            tap(result => console.log(result))
        ).subscribe(bar => this.as.updateSettings(bar, bar.barId));
    }

    openEditHoursDialog(hours: HoursFormData) {
        this.dialog.open(EditHoursComponent, {data: hours}).afterClosed().pipe(
            filter(result => !!result),
            tap(result => console.log(result))
        ).subscribe(editHours => this.as.updateHourSettings(editHours));
    }

    getHourKeys(hours: any) {
        return Object.keys(hours || {});
    }
}