import { Inject,Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

    baseUrl !: string;
 
   constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient)
   {
     this.baseUrl = this.config.apiEndpoint; 
   }


   applyLeave(startDate:Date, endDate:Date, reason:string)
   {
    const leaveData = {startDate, endDate, reason}
    return this.http.post(`${this.baseUrl}/leave`,leaveData)

   }

   


}
