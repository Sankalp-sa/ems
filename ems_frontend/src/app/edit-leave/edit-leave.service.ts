import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject,Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';

@Injectable({
  providedIn: 'root'
})
export class EditLeaveService {

  baseUrl !: string;
  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig,private http:HttpClient) {
    this.baseUrl = this.config.apiEndpoint; 
    
   }


  getLeaveById(id: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/leave/${id}`);}


  updateLeave(id: string, leaveData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/leave/update/${id}`, leaveData);
  }
}
 