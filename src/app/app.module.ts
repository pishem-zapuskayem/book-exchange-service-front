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
import {ConfirmComponent} from "./pages/home/confirm/confirm.component";
import {HeaderComponent} from "./pages/home/header/header.component";
import {SharedModule} from "./shared/shared.module";
import { ExchangeCardComponent } from './pages/myexchanges/exchange-card/exchange-card.component';
import {ActiveExchangeCardComponent} from "./pages/myexchanges/active-exchange-card/active-exchange-card.component";


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainComponent,
    MyexchangesComponent,
    StartChangeComponent,
    ConfirmComponent,
    ExchangeCardComponent,
    ActiveExchangeCardComponent,

  ],
  imports: [
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
