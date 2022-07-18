import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './master.component.html'
})
export class MasterComponent {

 
  constructor(private _auth:AuthService, private _router:Router) {}
  ngOnInit(): void {
  }

  title = 'Flight_Management';

  LoggedIn(input:boolean):boolean
  {
    if(input)
    {
      return this._auth.isLoggedIn();
    }
    else
    {
      return !this._auth.isLoggedIn();
    }
  }

  Logout()
  {
     this._auth.LogoutUser();
     //this._router.navigate(['/Home']);
  }

  IsAdminLogin():boolean
  {
     return this._auth.adminLoggedIn();
  }

  IsUserLogin():boolean
  {
    return this._auth.userLoggedIn();
  }
}
