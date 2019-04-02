import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router, fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    this.auth.loginWithEmail(this.loginForm.value.email, this.loginForm.value.password).subscribe(_user => {
      this.router.navigate(['employees', 'dashboard']);
    }, err => {
      this.errorMessage = 'Email or password is incorrect! Please try again.';
    });
  }
}
