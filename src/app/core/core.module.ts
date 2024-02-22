import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "./services/auth.service";
import {TokenStorageService} from "./services/token-storage.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    TokenStorageService,
  ],
})
export class CoreModule { }
