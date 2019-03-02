import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.loginWithEmail(this.email.value, this.password.value).subscribe(_user => {
      this.router.navigate(['employees', 'dashboard']);
    }, err => {
      this.errorMessage = err.message;
    });
  }
}
