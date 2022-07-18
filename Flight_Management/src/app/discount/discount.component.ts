import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiscountService } from '../services/discount.service';
import { AddDiscountModel } from './discountModels/addDiscountModel';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['../../styles.css']
})
export class DiscountComponent implements OnInit {

  constructor(private _router:Router, private _discount:DiscountService) { }

  ngOnInit(): void {
    this.SetMinDate();
  }

addDiscountRequest:AddDiscountModel = new AddDiscountModel();
showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
today:any;

DisplayModalPopup(modalHeader:string, modaltext:string)
{
  this.modalHeader = modalHeader;
  this.modalText=modaltext;
  if(modaltext != '' || modaltext != null || modaltext != undefined)
  {
  document.getElementById("btnLaunchModal")?.click();
  }
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
      case 'ManageDiscount' :
    {
      this._router.navigate(['Discount/Manage'])
      break;
    }
  }
}

HasError(typeofvalidator:string,controlname:string):Boolean{
  return this.addDiscountRequest.formAddDiscountGroup.controls[controlname].hasError(typeofvalidator);
}

AddDiscount()
{
  let addRequest = {
    discountCode: this.addDiscountRequest.discountCode,
    discountExpiryDate: this.addDiscountRequest.discountExpiryDate,
    discountValue: Number(this.addDiscountRequest.discountValue)
  };
this.ShowSpinner();
 this._discount.AddDiscount(addRequest).subscribe(res => {this.HideSpinner(), this.addDiscountRequest = new AddDiscountModel(), this.DisplayModalPopup("Success", "Discount coupon added successfully")},
 err => { this.HideSpinner(), this.DisplayModalPopup("Error", err.error.errorMessage)});
}

SetMinDate()
{
  this.today = new Date().toISOString().split('T')[0];
  this.today = this.today;
}

}
