import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../pages/home/header/header.component";
import {MatDialogClose, MatDialogModule} from "@angular/material/dialog";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {CoreModule} from "../core/core.module";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {RouterModule} from "@angular/router";
import {NzTreeComponent, NzTreeModule} from "ng-zorro-antd/tree";



@NgModule({
  declarations: [
    HeaderComponent,
    AuthDialogComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzLayoutModule,
    FormsModule,
    CoreModule,
    MatDialogModule,
    RouterModule,
    NzTreeComponent,
  ],
  exports: [
    HeaderComponent,
    CommonModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzTreeModule,
    NzTreeComponent,
    FormsModule,
    CoreModule,
    MatDialogModule,
    RouterModule,
  ]
})
export class SharedModule { }
