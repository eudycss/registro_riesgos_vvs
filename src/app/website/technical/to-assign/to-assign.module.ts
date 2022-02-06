import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToAssignRoutingModule } from './to-assign-routing.module';
import { ToAssignComponent } from './to-assign.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {StyleClassModule} from "primeng/styleclass";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ToAssignComponent
  ],
  imports: [
    CommonModule,
    ToAssignRoutingModule,
    NgComponentsModule,
    ComponentsModule,
    StyleClassModule,
    FormsModule
  ]
})
export class ToAssignModule { }
