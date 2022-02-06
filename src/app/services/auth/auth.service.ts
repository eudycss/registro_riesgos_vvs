import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import { catchError, map } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Login, UserInfo} from "../../models/login.model";
import {URL_API} from "../../utils/app.util";


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private userToken = new BehaviorSubject<string>("");
  private userName: string = '';
  private role: string = '';

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.checkToken();
  }

  login(authData: Login){
    return this._http.post<UserInfo>(`${URL_API}/auth/login`, authData)
      .pipe(
        map(user => {
          this.saveLocalStorage(user);
          this.loggedIn.next(true);
          this.userToken.next(user.token);
          this.userName = user.username;
          this.role = user.role;
          return user;
        }),
        catchError(err => {
          return throwError("CatchError: " + err);
        })
      )
  }

  public logout(): void {
    localStorage.removeItem('user-sgr');
    this.loggedIn.next(false);
    this.userToken.next('');
    this._router.navigate(['/auth/login']).then();
  }


  private saveLocalStorage(user: UserInfo): void {
    localStorage.setItem('user-sgr', JSON.stringify(user));
  }

  private checkToken(): void {
    const user = JSON.parse(<string>localStorage.getItem('user-sgr'));
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        this.loggedIn.next(true);
        this.userToken.next(user.token);
        this.userName = user.username;
        this.role = user.role;
      }
    }
    if (user == null) {
      this.loggedIn.next(false);
      this.userToken.next('');
      this.userName = "";
      this.role = "";
    }
  }

  get isLoggedIn(): Observable<boolean> {
    this.checkToken();
    return this.loggedIn.asObservable();
  }

  get userTokenValue(): string {
    return this.userToken.getValue();
  }

   get userNameValue(): string {
    return this.userName;
  }

  get roleValue(): string{
    return this.role;
  }


}
