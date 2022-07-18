import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../sharedModels/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles.css']
})
export class LoginComponent implements OnInit {

  constructor(private _auth:AuthService, private _router:Router) { }
  loginModel:UserModel = new UserModel();
  ngOnInit(): void {
  }
  modalText:string="";
  modalHeader:string="";
  showSpinner:boolean=false;
  Login()
  {
    if(this.loginModel.userName == '' || this.loginModel.password == '')
    {
      this.DisplayModalPopup("Error", "Please enter the username and password.")
      return;
    }
    this.ShowSpinner();
    let loginRequest = {
      username:this.loginModel.userName,
      password:this.loginModel.password
    };
     this._auth.loginUser(loginRequest).subscribe(res=>{this.HideSpinner(), localStorage.setItem('token', res.token);
    localStorage.setItem('userRole', res.role); this._router.navigate(['/Dashboard'])}
     ,res=>{console.log(res), this.HideSpinner(), this.DisplayModalPopup("Unauthorised", "Authorisation for the user failed!")});
  }

  ShowSpinner()
{
  this.showSpinner = true;
}

HideSpinner()
{
  this.showSpinner = false;
}
DisplayModalPopup(modalHeader:string, modaltext:string)
{
  this.modalHeader = modalHeader;
  this.modalText=modaltext;
  document.getElementById("btnLaunchModal")?.click();
}

hasError(typeofvalidator:string,controlname:string):Boolean{
  return this.loginModel.formLoginGroup.controls[controlname].hasError(typeofvalidator);
}
}
