import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypesRoutingModule } from './types-routing.module';
import { TypesComponent } from './types.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../../components/components.module";


@NgModule({
  declarations: [
    TypesComponent
  ],
  imports: [
    CommonModule,
    TypesRoutingModule,
    NgComponentsModule,
    FormsModule,
    ComponentsModule
  ]
})
export class TypesModule { }
