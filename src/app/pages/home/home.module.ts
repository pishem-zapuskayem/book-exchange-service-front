import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomePageComponent} from "./start-page/home-page.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {MatDialogModule} from "@angular/material/dialog";

import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../core/core.module";
const material=[
  MatDialogModule
]

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
    ReactiveFormsModule,
    CoreModule,
    FormsModule,
  ]
})
export class HomeModule { }
