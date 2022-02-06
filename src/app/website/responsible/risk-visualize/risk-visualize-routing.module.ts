import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RiskVisualizeComponent} from "./risk-visualize.component";

const routes: Routes = [
  {
    path: '',
    component: RiskVisualizeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskVisualizeRoutingModule { }
