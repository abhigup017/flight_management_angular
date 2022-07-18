import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DropdownService } from '../services/dropdown.service';
import { DropdownModel } from '../sharedModels/dropdownModel';
import { RegisterModel } from '../sharedModels/registerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../styles.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _dropdownService:DropdownService, private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this.ShowSpinner();
    this._dropdownService.GetGenderTypes().subscribe(res => {this.HideSpinner(), this.BindGenderTypes(res)},
    err => {this.HideSpinner(), console.log(err)})
  }

showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
registerModel:RegisterModel = new RegisterModel();
genderTypes:Array<DropdownModel> = new Array<DropdownModel>();
selectedGenderType:any;
isPasswordMatches:boolean=true;

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

BindGenderTypes(genderTypes:any)
{
  this.genderTypes = genderTypes;
  this.selectedGenderType = genderTypes[0];
}

hasError(typeofvalidator:string,controlname:string):Boolean{
  return this.registerModel.formRegisterGroup.controls[controlname].hasError(typeofvalidator);

}

PasswordMatches()
{
  if(this.registerModel.password == '' && this.registerModel.confirmPassword == '')
  {
    this.isPasswordMatches = false;
  }
  else if(this.registerModel.password != '' && this.registerModel.confirmPassword != '' && this.registerModel.password != this.registerModel.confirmPassword)
  {
    this.isPasswordMatches = false;
  }
  else if(this.registerModel.password != '' && this.registerModel.confirmPassword != '' && this.registerModel.password == this.registerModel.confirmPassword)
  {
    this.isPasswordMatches = true;
  }
}

RegisterUser()
{
  let request = {
    firstName: this.registerModel.firstName,
    lastName: this.registerModel.lastName,
    genderId: this.selectedGenderType.id,
    emailId: this.registerModel.emailId,
    userName: this.registerModel.userName,
    password: this.registerModel.password
  }
this.ShowSpinner();
this._auth.RegisterUser(request).subscribe(res => {this.HideSpinner(), window.alert("User registered successfully, please login to access your account"), this._router.navigate(['Login'])},
err => {this.HideSpinner(), this.DisplayModalPopup("Error", err.error), console.log(err)});
}
}
