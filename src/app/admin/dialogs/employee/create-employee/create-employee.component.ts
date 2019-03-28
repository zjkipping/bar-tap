import { Component, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from '@types';

@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.scss']
})

export class CreateEmployeeComponent {
    employeeForm: FormGroup;
    errorLabel = '';

    constructor(fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private employee: Employee | undefined) {
        this.employeeForm = fb.group({
            firstName: [(employee)? employee.firstName : '' ,[Validators.required]],
            lastName: [(employee)? employee.lastName : '', [Validators.required]],
            id: [(employee)? employee.id : undefined, [Validators.required]],
            pin: [(employee)? employee.pin : undefined, [Validators.required]]
        });
    }

    /* Randomly generated alphanumeric employee ID –– length of 5 */
    getRandomId(length: number) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for(var i = 0; i < length; ++i) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return this.employeeForm.controls['id'].setValue(result);
    }

    /* Randomly generated employee PIN –– range from 1000 - 9999 */
    getRandomPin(min: number, max: number) {
        return this.employeeForm.controls['pin'].setValue(Math.floor(Math.random() * (max - min) + min));
    }
}
