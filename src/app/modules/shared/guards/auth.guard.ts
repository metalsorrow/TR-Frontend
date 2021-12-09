import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  urlElements: string[];
  constructor(
    private _auth: AuthService,
    private _router: Router,
    
    ){
    this.urlElements = [];
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 /*     return this._auth.$getSerssionUser().pipe( map( user => {
        if(!user || user.userType !== route.data.roles[0]  ){
          this._router.navigate(['/'])
          return false;
        }
        return true
      })
    );*/
    return true;
  }

  
  
}
