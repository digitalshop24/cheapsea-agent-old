import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { AuthService } from './auth/auth.service';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CheapComponent } from './cheap/cheap.component';

const appRoutes: Routes = [
  // { path: '',             component: AppComponent },
  { path: 'offers',       component: CheapComponent },
  { path: 'login',        component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CheapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    A2tUiModule,
    HttpClientModule,
    NgbModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    Angular2TokenService,
    HttpClientModule,
    AuthService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
