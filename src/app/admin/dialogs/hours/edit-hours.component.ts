import { Component, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HoursFormData } from '@types';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-edit-hours',
    templateUrl: './edit-hours.component.html',
    styleUrls: ['./edit-hours.component.scss']
})


export class EditHoursComponent {

    hoursForm: FormGroup;
    errorLabel = '';
    constructor(fb: FormBuilder,  
        @Optional() @Inject(MAT_DIALOG_DATA) private data: HoursFormData | undefined ) {
        this.hoursForm = fb.group({
            sunday: [(data)? data.sunday: '', Validators.required],
            monday: [(data)? data.monday: '', Validators.required],
            tuesday: [(data)? data.tuesday: '', Validators.required],
            wednesday: [(data)? data.wednesday: '', Validators.required],
            thursday: [(data)? data.thursday: '', Validators.required],
            friday: [(data)? data.friday: '', Validators.required],
            saturday: [(data)? data.saturday: '', Validators.required]
        });
    }

}
