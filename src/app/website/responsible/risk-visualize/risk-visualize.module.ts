import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskVisualizeRoutingModule } from './risk-visualize-routing.module';
import { RiskVisualizeComponent } from './risk-visualize.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {StyleClassModule} from "primeng/styleclass";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RiskVisualizeComponent
  ],
  imports: [
    CommonModule,
    RiskVisualizeRoutingModule,
    NgComponentsModule,
    ComponentsModule,
    StyleClassModule,
    FormsModule
  ]
})
export class RiskVisualizeModule { }
