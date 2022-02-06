import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthRejectLoginGuard} from "./guards/auth-reject-login.guard";
import {AuthReturnLoginGuard} from "./guards/auth-rerturn-login.guard";
import {RoleGuard} from "./guards/role.guard";

const routes: Routes = [
  {
    path: 'auth/login',
    loadChildren: () => import('./website/auth/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthRejectLoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./website/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'admin/levels',
    loadChildren: () => import('./website/admin/levels/levels.module').then(m => m.LevelsModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_ADM']}
  },
  {
    path: 'admin/types',
    loadChildren: () => import('./website/admin/types/types.module').then(m => m.TypesModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_ADM']}
  },
  {
    path: 'admin/origins',
    loadChildren: () => import('./website/admin/origin/origin.module').then(m => m.OriginModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_ADM']}
  },
  {
    path: 'admin/units',
    loadChildren: () => import('./website/admin/unit-support/unit-support.module').then(m => m.UnitSupportModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_ADM']}
  },
  {
    path: 'admin/risks',
    loadChildren: () => import('./website/admin/risk/risk.module').then(m => m.RiskModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_ADM']}
  },
  {
    path: 'user/create-risk',
    loadChildren: () => import('./website/user/create-risk/create-risk.module').then(m => m.CreateRiskModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_USE']}
  },
  {
    path: 'user/risks',
    loadChildren: () => import('./website/user/risk-user/risk-user.module').then(m => m.RiskUserModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_USE']}
  },
  {
    path: 'technical/risks/register',
    loadChildren: () => import('./website/technical/to-register/to-register.module').then(m => m.ToRegisterModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_TEC']}
  },
  {
    path: 'technical/risks/assign',
    loadChildren: () => import('./website/technical/to-assign/to-assign.module').then(m => m.ToAssignModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_TEC']}
  },
  {
    path: 'risks/detail',
    loadChildren: () => import('./website/user/risk-detail/risk-detail.module').then(m => m.RiskDetailModule),
    canActivate: [AuthReturnLoginGuard]
  },
  {
    path: 'responsible/visualize',
    loadChildren: () => import('./website/responsible/risk-visualize/risk-visualize.module').then(m => m.RiskVisualizeModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_BOM', 'SGR_POL', 'SGR_FUE', 'SGR_HOS', 'SGR_CRU', 'SGR_TRA']}
  },
  {
    path: 'responsible/finalized',
    loadChildren: () => import('./website/responsible/risk-finalized/risk-finalized.module').then(m => m.RiskFinalizedModule),
    canActivate: [AuthReturnLoginGuard, RoleGuard],
    data: {roles: ['SGR_BOM', 'SGR_POL', 'SGR_FUE', 'SGR_HOS', 'SGR_CRU', 'SGR_TRA']}
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
