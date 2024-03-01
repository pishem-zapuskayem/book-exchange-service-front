import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from "./start-page/home-page.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {NzSpinModule} from "ng-zorro-antd/spin";


@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [
    RouterModule.forChild([
      {path: '', component: HomePageComponent}
    ]),
    CommonModule,
    SharedModule,
    NzSpinModule,


  ]
})
export class HomeModule { }
