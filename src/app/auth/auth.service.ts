import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  user;
  userSignedIn: boolean;
  constructor(
    public _tokenService: Angular2TokenService,
    private http: Http,
    private httpClient: HttpClient,
    private route: Router
  ) {
    this.userSignedIn = _tokenService.userSignedIn();
  }
  private getHeaders() {
    return {
      'uid':          localStorage.getItem('uid'),
      'access-token': localStorage.getItem('accessToken'),
      'client':       localStorage.getItem('client'),
      'expiry':       localStorage.getItem('expiry'),
      'token-type':   'Bearer',
    };
  }

  public initAuthPlugin() {
    this._tokenService.init({
      apiBase: environment.server_url,
      globalOptions: {
        headers: {
          'Content-Type': 'application/json',
          'Accept':       'application/json',
          'uid':          localStorage.getItem('uid'),
          'access-token': localStorage.getItem('accessToken'),
          'client':       localStorage.getItem('client'),
          'expiry':       localStorage.getItem('expiry'),
          'token-type':   'Bearer',
        }
      }
    });
  }

  public setHeaders(data) {
    const headers = data.headers;
    const authData = {
      accessToken:  headers.get('access-token'),
      client:       headers.get('client'),
      expiry:       headers.get('expiry'),
      tokenType:    headers.get('token-type'),
      uid:          headers.get('uid')
    };
    localStorage.setItem('accessToken', authData.accessToken);
    localStorage.setItem('client',      authData.client);
    localStorage.setItem('expiry',      authData.expiry);
    localStorage.setItem('tokenType',   authData.tokenType);
    localStorage.setItem('uid',         authData.uid);
  }

  public removeAuthHeaders() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('client');
    localStorage.removeItem('expiry');
    localStorage.removeItem('tokenType');
    localStorage.removeItem('uid');
  }

}
