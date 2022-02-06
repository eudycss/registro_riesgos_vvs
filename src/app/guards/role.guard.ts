import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {routes, TEC_CODE} from "../utils/app.util";
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

constructor(
  private _authService: AuthService,
  private _router: Router) {

}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const roles = route.data['roles'];

    const isPermitted = roles.includes(this._authService.roleValue);

    if (isPermitted){
      return true;
    }

    this._router.navigate(['/home']).then();
    return false;
  }

}
