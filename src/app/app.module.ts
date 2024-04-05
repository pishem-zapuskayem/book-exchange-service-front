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
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { MyexchangesComponent } from './pages/myexchanges/myexchanges.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {MatDialogClose} from "@angular/material/dialog";
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainComponent,
    AuthDialogComponent,
    MyexchangesComponent,
    StartChangeComponent,
    AuthDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NzLayoutModule,
    CoreModule,
    FormsModule,
    CoreModule,
    FormsModule,
    MatDialogClose,
    NzTreeModule,
    NzTreeComponent,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
