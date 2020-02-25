import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-component',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})

export class LoginComponent {
  public loading = false;
  public errorMessage = '';
  public tenantInfo: any;
  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {

  }

  public async  signIn(username, password) {
    try {
      await this.authenticationService.login(username, password);
      this.loading = false;
      this.router.navigate(['']);

    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  }

  public login({ value, invalid }) {
    if (invalid) {
      return;
    }
    this.loading = true;
    const { username, password } = value;
    this.signIn(username, password);
  }

  public loginControl(name) {
    return this.loginForm.get(name);
  }
}
