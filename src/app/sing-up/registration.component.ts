import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'registration-component',
  styleUrls: ['./registration.component.scss'],
  templateUrl: './registration.component.html'
})

export class RegistrationComponent {

  public needSetPmPassword = false;
  public selectedRole: string;
  public loading = false;
  public errorMessage = '';
  public tenantInfo: any;
  public disabledTenantInfo: any;
  public loginForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  public passwordConfirmationForm: FormGroup = this.formBuilder.group({
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

  }

  public async  signIn({ username, password, firstName, lastName }) {
    try {
      await this.authenticationService.signUp({
        username,
        password,
        firstName,
        lastName,
        role: this.selectedRole
      });
      this.loading = false;
      this.router.navigate(['']);

    } catch (error) {
      console.log(error);
    }
  }

  public register({ value, invalid }) {
    if (invalid) {
      return;
    }
    this.loading = true;
    const { accessToken, ...user } = value;
    this.signIn(user);
  }

  public selectRole(userRole) {
    this.selectedRole = userRole;
  }

  public loginControl(name) {
    return this.loginForm.get(name);
  }

  public passwordConfirmationControl(name) {
    return this.passwordConfirmationForm.get(name);
  }
}

