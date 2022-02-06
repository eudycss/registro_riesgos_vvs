import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskRoutingModule } from './risk-routing.module';
import { RiskComponent } from './risk.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {StyleClassModule} from "primeng/styleclass";


@NgModule({
  declarations: [
    RiskComponent
  ],
  imports: [
    CommonModule,
    RiskRoutingModule,
    NgComponentsModule,
    ComponentsModule,
    StyleClassModule
  ]
})
export class RiskModule { }
