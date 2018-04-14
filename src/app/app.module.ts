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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

import { CheapsComponent } from './cheaps/cheaps.component';
import { CreateOfferComponent } from './create-offer/create-offer.component';
import { GoogleAutocompleteComponent } from './google-autocomplete/google-autocomplete.component';
import { AirlineAutocompleteComponent } from './airline-autocomplete/airline-autocomplete.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';

import { NavbarComponent } from './ui/navbar/navbar.component';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

const appRoutes: Routes = [
  { path: '',                    component: AuthLayoutComponent,
    children: [
      { path: 'login',           component: LoginComponent },
      { path: 'registration',    component: RegistrationComponent },
      { path: 'forgot-password', component: ResetPasswordComponent }
    ]
  },
  { path: '',                    component: DashboardLayoutComponent,
    children: [
      { path: 'edit_offer/:id',  component: EditOfferComponent,    canActivate: [Angular2TokenService]},
      { path: 'create_offer',    component: CreateOfferComponent,  canActivate: [Angular2TokenService]},
      { path: 'offers',          component: CheapsComponent,       canActivate: [Angular2TokenService]},
      { path: 'update-password', component: UpdatePasswordComponent },
      { path: 'logout',          component: LogoutComponent },
    ]
  },
  { path: '**', redirectTo: 'offers', pathMatch: 'full' },
  { path: '', redirectTo: 'offers', pathMatch: 'full' }
];

// ### Old
// const appRoutes: Routes = [
//   // { path: '',             component: AppComponent },
//   { path: 'edit_offer/:id',  component: EditOfferComponent,    canActivate: [Angular2TokenService]},
//   { path: 'create_offer',    component: CreateOfferComponent,  canActivate: [Angular2TokenService]},
//   { path: 'offers',          component: CheapsComponent,       canActivate: [Angular2TokenService]},
//
//   { path: 'login',           component: LoginComponent },
//   { path: 'registration',    component: RegistrationComponent },
//
//   { path: 'forgot-password', component: ResetPasswordComponent },
//   { path: 'update-password', component: UpdatePasswordComponent },
//   { path: 'logout',          component: LogoutComponent },
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
// ];

// ### Example
// const appRoutes: Routes = [
//
//   //Site routes goes here
//   {
//     path: '',
//     component: SiteLayoutComponent,
//     children: [
//       { path: '', component: HomeComponent, pathMatch: 'full'},
//       { path: 'about', component: AboutComponent }
//     ]
//   },
//
//   // App routes goes here here
//   {
//     path: '',
//     component: AppLayoutComponent,
//     children: [
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'profile', component: ProfileComponent }
//     ]
//   },
//
//   //no layout routes
//   { path: 'login', component: LoginComponent},
//   { path: 'register', component: RegisterComponent },
//   // otherwise redirect to home
//   { path: '**', redirectTo: '' }
// ];
//
// export const routing = RouterModule.forRoot(appRoutes);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    CheapsComponent,
    CreateOfferComponent,
    LogoutComponent,
    GoogleAutocompleteComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,
    AirlineAutocompleteComponent,
    EditOfferComponent,
    NavbarComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent
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

// https://plnkr.co/edit/iFXRkJWVZ9tQ9i6mxmuf?p=preview
// https://plnkr.co/edit/hQ6RtzCfPosfQl4HlbZQ?p=preview
