import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRiskRoutingModule } from './create-risk-routing.module';
import { CreateRiskComponent } from './create-risk.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {PanelModule} from "primeng/panel";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {AgmCoreModule} from "@agm/core";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    CreateRiskComponent
  ],
  imports: [
    CommonModule,
    CreateRiskRoutingModule,
    NgComponentsModule,
    ComponentsModule,
    PanelModule,
    FormsModule,
    CalendarModule,
    InputTextareaModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDCnQ4DM-e4NCxQ-DT2OxvB-jNOskxRfU0"
    }),
    ProgressSpinnerModule
  ]
})
export class CreateRiskModule { }
