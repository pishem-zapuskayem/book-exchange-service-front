import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import {StartChangeComponent} from "./pages/home/start-change/start-change.component";
import {MyexchangesComponent} from "./pages/myexchanges/myexchanges.component";
import {MainComponent} from "./pages/home/main/main.component";
import {ConfirmComponent} from "./pages/home/confirm/confirm.component";



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },

  {path: 'registration', component: RegistrationComponent },
  {path: 'exchange', component: StartChangeComponent },
  {path: 'registration', component: RegistrationComponent },
  {path: 'exchanges', component: MyexchangesComponent },
  {path: 'confirm', component: ConfirmComponent }

];


@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
