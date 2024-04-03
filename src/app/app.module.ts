import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './pages/home/main/main.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";
import {AuthDialogComponent} from "./auth-dialog/auth-dialog.component";
import {StartChangeComponent} from "./pages/home/start-change/start-change.component";

import { MyexchangesComponent } from './pages/myexchanges/myexchanges.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {MatDialogClose} from "@angular/material/dialog";
import {ConfirmComponent} from "./pages/home/confirm/confirm.component";
import {HeaderComponent} from "./pages/home/header/header.component";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainComponent,
    MyexchangesComponent,
    StartChangeComponent,
    ConfirmComponent,

  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
