import { Inject, Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  UserDetails!: any;
  baseUrl !: string;

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private authService: AuthService, private http: HttpClient) {
    this.baseUrl = this.config.apiEndpoint;
  }

  getUserProfile() {
    return this.http.get(`${this.baseUrl}/user/${this.authService.userDetails.username}`)
  }
}
