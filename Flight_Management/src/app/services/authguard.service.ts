import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private _auth:AuthService, private _router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this._auth.isLoggedIn() && this._auth.adminLoggedIn())
    {
      return true;
    }
    else
    {
      window.alert('You are not authorised to view this page!! Redirecting you back to the Home page.')
      this._router.navigate(['Home']);
      return false;
    }
  }
}
