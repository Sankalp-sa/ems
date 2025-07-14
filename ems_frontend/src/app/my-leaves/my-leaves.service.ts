import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { Leave } from './my-leaves.interface';

@Injectable({
  providedIn: 'root'
})
export class MyLeavesService {

  baseUrl !: string;

  constructor(private http: HttpClient, @Inject(APP_SERVICE_CONFIG) private config: AppConfig) {
    this.baseUrl = this.config.apiEndpoint;
  }

  getMyLeaves() {
    return this.http.get<Leave[]>(`${this.baseUrl}/leave/myleave`); // Adjust the endpoint as necessary
  }
}
