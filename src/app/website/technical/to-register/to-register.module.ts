import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToRegisterRoutingModule } from './to-register-routing.module';
import { ToRegisterComponent } from './to-register.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {StyleClassModule} from "primeng/styleclass";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ToRegisterComponent
  ],
    imports: [
        CommonModule,
        ToRegisterRoutingModule,
        NgComponentsModule,
        ComponentsModule,
        StyleClassModule,
        FormsModule
    ]
})
export class ToRegisterModule { }
