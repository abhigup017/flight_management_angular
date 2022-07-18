import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "https://localhost:44364/api/1.0/flight/search";

  SearchFlights(request:any)
  {
    return this.http.post(this._baseUrl, request);
  }
}
