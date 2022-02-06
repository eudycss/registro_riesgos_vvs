import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {AuthService} from "../../../services/auth/auth.service";
import {ADMIN_CODE, RESPS_CODES, TEC_CODE, USER_CODE} from "../../../utils/app.util";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];
  itemsUser: MenuItem[] = [];
  userName: string = '';
  role: string = '';

  constructor(private _authService: AuthService) {
    this.userName = this._authService.userNameValue;
    this.role = this._authService.roleValue;
  }

  ngOnInit(): void {
    this.items = [
    
      {
        label: 'Riesgos',
        icon: 'pi pi-chart-line',
        routerLink: ['/admin/risks'],
        visible: this.role === ADMIN_CODE
      },
      {
        label: 'Tipos',
        icon: 'pi pi-filter',
        routerLink: ['/admin/types'],
        visible: this.role === ADMIN_CODE
      },
      {
        label: 'Origen',
        icon: 'pi pi-images',
        routerLink: ['/admin/origins'],
        visible: this.role === ADMIN_CODE
      },
      {
        label: 'Nivel',
        icon: 'pi pi-percentage',
        routerLink: ['/admin/levels'],
        visible: this.role === ADMIN_CODE
      },
      {
        label: 'Unidades',
        icon: 'pi pi-shield',
        routerLink: ['/admin/units'],
        visible: this.role === ADMIN_CODE
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-user-edit',
        routerLink: ['/users'],
        visible: this.role === ADMIN_CODE
      },
      {
        label: 'Roles',
        icon: 'pi pi-tablet',
        routerLink: ['/admin/roles'],
        visible: this.role === ADMIN_CODE
      },
      {
        label: 'Riesgos',
        icon: 'pi pi-chart-line',
        routerLink: ['/user/risks'],
        visible: this.role === USER_CODE
      },
      {
        label: 'Crear riesgo',
        icon: 'pi pi-chart-line',
        routerLink: ['/user/create-risk'],
        visible: this.role === USER_CODE
      },
      {
        label: 'Registrar',
        icon: 'pi pi-chart-line',
        routerLink: ['/technical/risks/register'],
        visible: this.role === TEC_CODE
      },
      {
        label: 'Asignar',
        icon: 'pi pi-chart-line',
        routerLink: ['/technical/risks/assign'],
        visible: this.role === TEC_CODE
      },
      {
        label: 'Visualizar',
        icon: 'pi pi-chart-line',
        routerLink: ['/responsible/visualize'],
        visible: RESPS_CODES.includes(this.role)
      },
      {
        label: 'Finalizados',
        icon: 'pi pi-chart-line',
        routerLink: ['/responsible/finalized'],
        visible: RESPS_CODES.includes(this.role)
      }
    ];

    this.itemsUser = [
      {
        label: 'Mi perfil',
        disabled: true,
        icon: 'pi pi-user-edit',
        command: () => {},
      },
      {
        label: 'Cerrar Sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          this.onLogout();
        },
      },
    ];
  }

  onLogout(): void {
    this._authService.logout();
  }
}
