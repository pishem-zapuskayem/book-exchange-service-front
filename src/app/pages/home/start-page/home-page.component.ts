import { Component } from '@angular/core';
import {AuthDialogComponent} from "../../../auth-dialog/auth-dialog.component";
import {
  MatDialog,
  MatDialogModule
} from "@angular/material/dialog";
import { NzMessageService } from 'ng-zorro-antd/message';
import {AppRoutingModule} from "../../../app-routing.module";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  constructor(public dialog: MatDialog, private message: NzMessageService, private router: AppRoutingModule) {}
  showLogin() {
    this.dialog.open(AuthDialogComponent);
  }
  createMessage(type: string): void {
    this.message.create(type, `Данный раздел доступен только авторизованному пользователю`);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  navigateToMyExchanges() {
    this.router.navigate(['/exchanges']);
  }
}
