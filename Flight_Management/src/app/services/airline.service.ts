import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddAirlineModel } from '../airlines/airlineModels/AddAirlineModel';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "https://localhost:44364/api/1.0/airline";

  GetAllAirlines()
  {
    return this.http.get<any>(this._baseUrl + "/all");
  }

  BlockAirline(airlineId:string)
  {
    return this.http.put<any>(this._baseUrl + "/block/" + airlineId,{});
  }

  UnBlockAirline(airlineId:string)
  {
    return this.http.put<any>(this._baseUrl + "/unblock/" + airlineId,{});
  }

  RemoveAirline(airlineId:string)
  {
    return this.http.delete<any>(this._baseUrl + "/remove/" + airlineId);
  }

  AddAirline(airlineRequest:any)
  {
    return this.http.post<any>(this._baseUrl + "/register", airlineRequest);
  }
}
