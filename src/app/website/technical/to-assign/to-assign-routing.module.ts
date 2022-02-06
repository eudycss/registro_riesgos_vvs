import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToAssignComponent} from "./to-assign.component";

const routes: Routes = [
  {
    path: '',
    component: ToAssignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToAssignRoutingModule { }
