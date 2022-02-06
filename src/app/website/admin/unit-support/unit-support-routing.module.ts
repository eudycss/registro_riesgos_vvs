import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UnitSupportComponent} from "./unit-support.component";

const routes: Routes = [
  {
    path: '',
    component: UnitSupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitSupportRoutingModule { }
