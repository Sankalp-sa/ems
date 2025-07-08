import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl !: string;

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient) {
    this.baseUrl = this.config.apiEndpoint; 
  }

  register(userName: string, email: string, password: string) {
    const registerData = { username: userName, email, password };
    return this.http.post(`${this.baseUrl}/user/register`, registerData);
  }

}
