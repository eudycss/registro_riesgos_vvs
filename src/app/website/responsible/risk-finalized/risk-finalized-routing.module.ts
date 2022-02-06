import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RiskFinalizedComponent} from "./risk-finalized.component";

const routes: Routes = [
  {
    path: '',
    component: RiskFinalizedComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskFinalizedRoutingModule { }
