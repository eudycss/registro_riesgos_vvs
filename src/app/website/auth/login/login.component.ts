import { Component, OnInit } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import {Login, UserInfo} from "../../../models/login.model";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {CreateUser} from "../../../models/user.model";
import {HttpService} from "../../../services/http/http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  isLoading = false;
  submittedRegister = false;
  login: Login = { username: "", password: ""};
  displayBasic = false;
  userRegister: CreateUser = {
    username: '',
    name: '',
    lastname: '',
    password: '',
    active: true,
    email: '',
    role: 1,
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(){

    if (this.login.username === '' || this.login.password === '') {
      this.showMessage({
        severity: 'error',
        summary: 'Error de login',
        detail: 'Las credenciales están vacias'
      });
      return;
    }


    this.authService.login(this.login).subscribe(data=>{
      if (data){
        this._router.navigate(['/home']).then();
      }
    }, err=>{
      this.showMessage({
        severity: 'error',
        summary: 'Error de login',
        detail: 'Las credenciales no son correctas',
        data: err
      });
    });
  }

  showMessage(message: Message): void {
    this.messageService.add({
      severity: message.severity,
      summary: message.summary,
      detail: message.detail
    });
  }

  onRegister(){
    this.submittedRegister = true;


    this.httpService.post(`helper/register`, this.userRegister).subscribe(d=>{
      this.submittedRegister = false;
      this.displayBasic = false;
      this.showMessage({
        severity: 'success',
        summary: 'Registrado!',
        detail: 'Su usuario ha sido creado!',
      });
    })

  }

  onShowModal(){
    this.displayBasic = true;
  }

}
