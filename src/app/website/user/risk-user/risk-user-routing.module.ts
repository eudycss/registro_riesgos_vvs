import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RiskUserComponent} from "./risk-user.component";

const routes: Routes = [
  {
    path: '',
    component: RiskUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskUserRoutingModule { }
