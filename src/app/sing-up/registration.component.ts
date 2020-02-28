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

  public selectedRole: string;
  public loading = false;
  public user;
  public errorMessage = '';
  public confirmPasswordModeOpen = false;
  public tenantInfo: any;
  public loginForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
  });
  public passwordConfirmationForm: FormGroup = this.formBuilder.group({
    oneTimePassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

  }

  public async  createUser({ email, firstName, lastName }) {
    try {
      await this.authenticationService.createUser({
        email,
        firstName,
        lastName,
        role: this.selectedRole
      });
      this.loading = false;
      this.confirmPasswordModeOpen = true;

    } catch ({ error }) {
      if (error.statusCode >= 400 || error.statusCode <  500)  {
        this.errorMessage = 'Email is not valid';

        if (error.message[0].property === 'role')  {
          this.errorMessage = 'Please specify user role';
        }
      }
      this.loading = false;
      console.log(error);
    }
  }

  public async signUp({ value, invalid }) {
    if (invalid) {
      return;
    }

    this.loading = true;
    const { oneTimePassword, newPassword, confirmPassword } = value;
    if (newPassword !== confirmPassword) {
      this.loading = false;
      this.errorMessage = 'Password doesn\'t match';
      return;
    }

    try {
      await this.authenticationService.signUp({
        ...this.user,
        oneTimePassword,
        password: newPassword,
        role: this.selectedRole
      });
      this.loading = false;
      this.router.navigate(['']);
    } catch (error) {
      if (error.statusCode >= 400 || error.statusCode <  500)  {
        this.errorMessage = 'Password is incorrect';
      }
      this.loading = false;
      console.log(error);
    }
  }

  public register({ value, invalid }) {
    if (invalid) {
      return;
    }

    this.loading = true;
    const { accessToken, ...user } = value;
    this.user = user;
    this.createUser(user);
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

