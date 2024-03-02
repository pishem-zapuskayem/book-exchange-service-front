import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './pages/home/main/main.component';
import { StartexchangeComponent } from './startexchange/startexchange.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainComponent,
    StartexchangeComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        CoreModule
    ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
