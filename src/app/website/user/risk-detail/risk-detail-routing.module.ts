import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RiskDetailComponent} from "./risk-detail.component";

const routes: Routes = [
  {
    path: ':id',
    component: RiskDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskDetailRoutingModule { }
