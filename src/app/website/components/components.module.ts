import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgComponentsModule} from "../../ng/ng-components.module";
import {MenuComponent} from "./menu/menu.component";
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [MenuComponent, LoadingComponent],
  imports: [
    CommonModule,
    NgComponentsModule
  ],
  exports: [MenuComponent, LoadingComponent]
})
export class ComponentsModule { }
