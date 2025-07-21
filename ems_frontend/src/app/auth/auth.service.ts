import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { User } from './auth.user.interface';
import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl !: string;
  isLoggedIn!: boolean;
  userDetails!: User | null;

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private socketService: SocketService) {
    this.baseUrl = this.config.apiEndpoint; // Assuming apiEndpoint is defined in your config
  }

  login(userName: string, password: string) {
    const loginData = { username: userName, password };
    return this.http.post(`${this.baseUrl}/auth/login`, loginData);
  }

  getUserDetails() {
    return this.http.get(`${this.baseUrl}/auth/status`);
  }

  logout() {
    this.isLoggedIn = false; // Reset login status
    this.userDetails = null; // Clear user details
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  hasRole(role: string): boolean {
    return this.userDetails?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.includes(this.userDetails?.role || '');
  }


}
