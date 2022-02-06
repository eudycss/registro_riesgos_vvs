import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OriginRoutingModule } from './origin-routing.module';
import { OriginComponent } from './origin.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OriginComponent
  ],
  imports: [
    CommonModule,
    OriginRoutingModule,
    NgComponentsModule,
    ComponentsModule,
    FormsModule
  ]
})
export class OriginModule { }
