import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ROUTES } from './app.router';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './common/services/authentication.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Services } from './common/services';
import { RegistrationComponent } from './sing-up/registration.component';
import { Components, EntryComponents } from './components';
import { JwtInterceptor } from './common/services/interceptor.service';
import { Guards } from './common/guards';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import {  MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ...Components,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserModule,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    NgxPermissionsModule.forRoot(),
    BrowserAnimationsModule,
  ],
  entryComponents: [
    ...EntryComponents,
  ],
  providers: [
    ...Services,
    ...Guards,
    {
      provide: APP_INITIALIZER,
      useFactory: (
        authenticationService: AuthenticationService,
        ngxPermissionsService: NgxPermissionsService,
      ) => () => {
        return Promise.all([
          authenticationService.fetchUser(),
        ]).then(([ user ]) => {
          if (user) {
            ngxPermissionsService.loadPermissions([user.role]);
          }
        });
      },
      deps: [AuthenticationService, NgxPermissionsService],
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
