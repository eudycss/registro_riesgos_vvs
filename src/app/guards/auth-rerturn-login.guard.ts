import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthReturnLoginGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.isLoggedIn.pipe(
      map(loggedIn => {
        if (!loggedIn) {
          this._router.navigate(['/auth/login']).then();
        }
        return loggedIn;
      })
    )
  }

}
