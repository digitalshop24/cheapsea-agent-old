import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { AuthService } from './auth/auth.service';
import { AgmCoreModule } from '@agm/core';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LogoutComponent } from './logout/logout.component';

import { CheapsComponent } from './cheaps/cheaps.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { GoogleAutocompleteComponent } from './google-autocomplete/google-autocomplete.component';

const appRoutes: Routes = [
  // { path: '',             component: AppComponent },
  { path: 'create_offer', component: CreateOfferComponent },
  { path: 'offers',       component: CheapsComponent },
  { path: 'login',        component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'logout',       component: LogoutComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CheapsComponent,
    CreateOfferComponent,
    LogoutComponent,
    GoogleAutocompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    A2tUiModule,
    HttpClientModule,
    NgbModule.forRoot(),
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBEX35MB2wDC4dXdecw6SdFfu-_z-gD5rI',
      libraries: ['places']
    }),
  ],
  providers: [
    Angular2TokenService,
    HttpClientModule,
    AuthService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


// ng build --prod --aot=false --bh ./
// firebase deploy
