import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskFinalizedRoutingModule } from './risk-finalized-routing.module';
import { RiskFinalizedComponent } from './risk-finalized.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {StyleClassModule} from "primeng/styleclass";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RiskFinalizedComponent
  ],
  imports: [
    CommonModule,
    RiskFinalizedRoutingModule,
    NgComponentsModule,
    ComponentsModule,
    StyleClassModule,
    FormsModule
  ]
})
export class RiskFinalizedModule { }
