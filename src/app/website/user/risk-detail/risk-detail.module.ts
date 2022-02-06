import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskDetailRoutingModule } from './risk-detail-routing.module';
import { RiskDetailComponent } from './risk-detail.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {StyleClassModule} from "primeng/styleclass";
import {AgmCoreModule} from "@agm/core";


@NgModule({
  declarations: [
    RiskDetailComponent
  ],
  imports: [
    CommonModule,
    RiskDetailRoutingModule,
    NgComponentsModule,
    ComponentsModule,
    StyleClassModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDCnQ4DM-e4NCxQ-DT2OxvB-jNOskxRfU0"
    })
  ]
})
export class RiskDetailModule { }
