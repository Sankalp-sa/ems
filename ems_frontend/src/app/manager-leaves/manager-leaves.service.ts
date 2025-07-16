import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { Leave } from '../my-leaves/my-leaves.interface';

@Injectable({
  providedIn: 'root'
})
export class ManagerLeavesService {

  baseUrl !: string;

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient) {
    this.baseUrl = this.config.apiEndpoint;
  }

  getManagerLeaves() {
    return this.http.get<Leave[]>(`${this.baseUrl}/leave/employeeLeaves`);
  }

  manageLeave(leaveId: string, status: string) {
    return this.http.patch(`${this.baseUrl}/leave/manageLeave`, { leaveId, status });
  }
}
