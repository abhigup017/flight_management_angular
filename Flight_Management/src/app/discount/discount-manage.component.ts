import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountService } from '../services/discount.service';
import { DiscountDetailsModel } from './discountModels/discountDetailsModel';

@Component({
  selector: 'app-discount-manage',
  templateUrl: './discount-manage.component.html',
  styleUrls: ['../../styles.css']
})
export class DiscountManageComponent implements OnInit {

  constructor(private _router:Router, private _discount:DiscountService) { }

  ngOnInit(): void {
    this.FetchAllDiscountCoupons();
  }

  showSpinner:boolean=false;
  modalText:string="";
  modalHeader:string="";
  discountList:Array<DiscountDetailsModel> = new Array<DiscountDetailsModel>();

  DisplayModalPopup(modalHeader:string, modaltext:string)
{
  this.modalHeader = modalHeader;
  this.modalText=modaltext;
  document.getElementById("btnLaunchModal")?.click();
}

ShowSpinner()
{
  this.showSpinner = true;
}

HideSpinner()
{
  this.showSpinner = false;
}

ToggleDisplay(selector:string)
{
  switch(selector)
  {
      case 'AddDiscount' :
    {
      this._router.navigate(['Discount/Add'])
      break;
    }
  }
}

RemoveDiscountCoupon(request:any)
{
  this.ShowSpinner();
  this._discount.RemoveDiscountCoupon(request.discountId).subscribe(res => {this.HideSpinner(), this.DisplayModalPopup("Success", "Discount coupon deleted successfully"), this.FetchAllDiscountCoupons()},
  err => {this.HideSpinner(), this.DisplayModalPopup("Error", "An error occurred while removing the discount coupon")});
}

FetchAllDiscountCoupons()
{
  this.ShowSpinner();
    this._discount.GetAllDiscount().subscribe(res => {this.HideSpinner(), this.BindDiscountResponseToModel(res)},
    err => {this.HideSpinner(), this.DisplayModalPopup("Error", "An error occurred while fetching the discounts")});
}

BindDiscountResponseToModel(response:any)
{
  this.discountList = response;
}

}
