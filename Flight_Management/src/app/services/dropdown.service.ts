import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http:HttpClient) { }

  private _dropDownUrl = "https://localhost:44364/api/1.0/dropdown";

  GetGenderTypes()
  {
    return this.http.get(this._dropDownUrl + "/gender");
  }

  GetInstrumentTypes()
  {
    return this.http.get(this._dropDownUrl + "/instrument");
  }

  GetLocationTypes()
  {
    return this.http.get(this._dropDownUrl + "/locations");
  }

  GetMealPlanTypes()
  {
    return this.http.get(this._dropDownUrl + "/mealplan");
  }

  GetRoleTypes()
  {
    return this.http.get(this._dropDownUrl + "/roles");
  }

  GetAirlines()
  {
    return this.http.get(this._dropDownUrl + "/airlines")
  }
}
