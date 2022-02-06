import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToRegisterComponent} from "./to-register.component";

const routes: Routes = [
  {
    path: '',
    component: ToRegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToRegisterRoutingModule { }
