import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http:HttpClient) { }

  private _baseUrl = "https://localhost:44364/api/1.0/discount"

  AddDiscount(request:any)
  {
    return this.http.post(this._baseUrl + "/add", request);
  }

  GetAllDiscount()
  {
    return this.http.get(this._baseUrl + "/all");
  }

  RemoveDiscountCoupon(discountId:number)
  {
    return this.http.delete(this._baseUrl + "/delete/" + discountId);
  }

  ApplyDiscount(discountCode:string)
  {
    return this.http.get(this._baseUrl + "/code/" + discountCode);
  }
}
