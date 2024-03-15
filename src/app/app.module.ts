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

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainComponent,
    StartChangeComponent,
    AuthDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        CoreModule,
        FormsModule,
    ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
