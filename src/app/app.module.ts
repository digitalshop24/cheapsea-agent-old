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
import { AgmCoreModule } from '@agm/core';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CheapsComponent } from './cheaps/cheaps.component';

import { CreateOfferComponent } from './create-offer/create-offer.component';

const appRoutes: Routes = [
  // { path: '',             component: AppComponent },
  { path: 'create_offer', component: CreateOfferComponent },
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
    CheapsComponent,
    CreateOfferComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
