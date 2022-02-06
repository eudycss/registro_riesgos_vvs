import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitSupportRoutingModule } from './unit-support-routing.module';
import { UnitSupportComponent } from './unit-support.component';
import {ComponentsModule} from "../../components/components.module";
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UnitSupportComponent
  ],
  imports: [
    CommonModule,
    UnitSupportRoutingModule,
    ComponentsModule,
    NgComponentsModule,
    FormsModule
  ]
})
export class UnitSupportModule { }
