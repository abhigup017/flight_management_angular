import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketdetailsService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "https://localhost:44364/api/1.0/ticket/search/"

  GetTicketHistory(pnrNumber:string)
  {
    return this.http.get(this._baseUrl + pnrNumber);
  }
}
