import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelsRoutingModule } from './levels-routing.module';
import { LevelsComponent } from './levels.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LevelsComponent
  ],
    imports: [
        CommonModule,
        LevelsRoutingModule,
        NgComponentsModule,
        ComponentsModule,
        FormsModule
    ]
})
export class LevelsModule { }
