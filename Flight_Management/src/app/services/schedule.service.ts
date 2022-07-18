import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http:HttpClient) { }

  
  private _scheduleUrl = "https://localhost:44364/api/1.0/airline";

  AddScheduleInventory(scheduleRequest:any)
  {
    return this.http.post(this._scheduleUrl + "/inventory/add", scheduleRequest);
  }

  SearchSchedule(searchRequest:any)
  {
    return this.http.post(this._scheduleUrl + "/inventory/search", searchRequest);
  }
}
