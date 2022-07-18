import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagebookingService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "https://localhost:44364/api/1.0/booking"

  GetBookingHistory(emailId:string)
  {
    return this.http.get(this._baseUrl + "/history/" + emailId);
  }

  CancelTicket(pnrNumber:string)
  {
    return this.http.delete(this._baseUrl + "/cancel/" + pnrNumber);
  }
}
