import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl !: string;
  isLoggedIn = false;

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient) {

      this.baseUrl = this.config.apiEndpoint; // Assuming apiEndpoint is defined in your config
  }

  login(userName: string, password: string) {
    const loginData = { username: userName, password };
    return this.http.post(`${this.baseUrl}/auth/login`, loginData);
  }
}
