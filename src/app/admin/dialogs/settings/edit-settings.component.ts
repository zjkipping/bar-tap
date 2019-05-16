import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SettingsFormData } from '@types';


@Component({
    selector: 'app-edit-settings',
    templateUrl: './edit-settings.component.html',
    styleUrls: ['./edit-settings.component.scss'],
})

export class EditSettingsComponent {
    
    settingsForm: FormGroup;
    errorLabel = '';

    constructor(fb: FormBuilder, 
                @Inject(MAT_DIALOG_DATA) private details: SettingsFormData | undefined
                ) {        
                    this.settingsForm = fb.group({
                        meta: fb.group({
                            name: [(details)? details.meta.name: '', Validators.required],
                            description: [(details)? details.meta.description: '', Validators.required],
                            location: [(details)? details.meta.location : '', Validators.required]
                        }),
                        apiKey: [(details)? details.apiKey: '', Validators.required],
                        secret: [(details)? details.secret: '', Validators.required]
                    });
    }
}