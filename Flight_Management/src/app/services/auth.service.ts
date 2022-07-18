import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private _router:Router) { }

  private _loginUrl="https://localhost:44364/api/1.0/login/admin";

  loginUser(userDetails:any)
  {
    return this.http.post<any>(this._loginUrl, userDetails);
  }

  adminLoggedIn()
  {
    return !!localStorage.getItem('userRole') && localStorage.getItem('userRole') == '1';
  }

  userLoggedIn()
  {
    return !!localStorage.getItem('userRole') && localStorage.getItem('userRole') == '2';
  }

  isLoggedIn()
  {
    return !!localStorage.getItem('token');
  }

  LogoutUser()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole')
    this._router.navigate(['/Home']);
  }

  GetToken()
  {
    return localStorage.getItem('token');
  }

  RegisterUser(request:any)
  {
    return this.http.post<any>("https://localhost:44364/api/1.0/user/register", request);
  }
}
