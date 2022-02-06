import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateRiskComponent} from "./create-risk.component";

const routes: Routes = [
  {
    path: '',
    component: CreateRiskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRiskRoutingModule { }
