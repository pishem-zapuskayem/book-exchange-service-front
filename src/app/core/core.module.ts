import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./services/auth.service";
import {TokenStorageService} from "./services/token-storage.service";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TokenStorageService,
  ],
})
export class CoreModule { }
