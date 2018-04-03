import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const appRoutes: Routes = [
  // { path: '',             component: AppComponent },
  { path: 'login',        component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    A2tUiModule,
    HttpClientModule,
    NgbModule.forRoot(),
    HttpModule,
    // A2tUiModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    Angular2TokenService,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
