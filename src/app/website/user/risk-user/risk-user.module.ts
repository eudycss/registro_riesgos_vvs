import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RiskUserRoutingModule} from './risk-user-routing.module';
import {RiskUserComponent} from './risk-user.component';
import {NgComponentsModule} from "../../../ng/ng-components.module";
import {ComponentsModule} from "../../components/components.module";
import {StyleClassModule} from "primeng/styleclass";


@NgModule({
  declarations: [
    RiskUserComponent
  ],
  imports: [
    CommonModule,
    RiskUserRoutingModule,
    NgComponentsModule,
    ComponentsModule,
    StyleClassModule
  ]
})
export class RiskUserModule {
}
