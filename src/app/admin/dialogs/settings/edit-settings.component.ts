import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControlName, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Bar, SettingsFormData } from '@types';


@Component({
    selector: 'app-edit-settings',
    templateUrl: './edit-settings.component.html',
    styleUrls: ['./edit-settings.component.scss'],
})

export class EditSettingsComponent {
    hours: string[] = [
        "12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM",
        "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"
    ];
    // disableClosed = new FormControl({value: 'Closed', disable: false});
    // disableClosed = new FormControl(false);
    settingsForm: FormGroup;
    errorLabel = '';

    constructor(fb: FormBuilder, 
                @Inject(MAT_DIALOG_DATA) private settings: Bar | undefined,
                @Inject(MAT_DIALOG_DATA) private barApiKey: string | undefined,
                @Inject(MAT_DIALOG_DATA) private stripeSecret: string | undefined
                ) {        
                    this.settingsForm = fb.group({
                        meta: fb.group({
                            name: [(settings)? settings.name: '', Validators.required],
                            description: [(settings)? settings.description: '', Validators.required],
                            location: [(settings)? settings.location : '', Validators.required]
                        }),
                        apiKey: [(barApiKey)? barApiKey: '', Validators.required],
                        secret: [(stripeSecret)? stripeSecret: '', Validators.required]
                    });
    }
}