import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthDialogComponent} from "../../../auth-dialog/auth-dialog.component";
import {
  MatDialog,
  MatDialogModule
} from "@angular/material/dialog";
import { NzMessageService } from 'ng-zorro-antd/message';
import {AppRoutingModule} from "../../../app-routing.module";
import { Router } from '@angular/router';
import {AuthService} from "../../../core/services/auth.service";
import {AccountDTO} from "../../../core/interfaces/account.dto";
import {Observer} from "rxjs";
import {HttpResponse} from "@angular/common/http";
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  user !: AccountDTO;
  isLoading: boolean=false;

  constructor(public dialog: MatDialog,
              private message: NzMessageService,
              private router: AppRoutingModule,
              public authService:  AuthService) {}

  showLogin() {
    this.dialog.open(AuthDialogComponent);
  }

  createMessage(type: string): void {
    this.message.create(type, `Данный раздел доступен только авторизованному пользователю`);
  }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()){
      this.isLoading=true;
      const observer: Observer <AccountDTO> = {
        complete: () =>  {
        },

        error: (err: any) => {
        },

        next: (value: AccountDTO) => {
          this.isLoading=false;
          console.log(value)
          this.user=value;
        }
      }
      this.authService.getAuthenticated().subscribe(observer);
    }
  }

  getAvatarOrDefault(user: AccountDTO): string {
    return user.urlAvatar != undefined ? user.urlAvatar : "assets/1.png";
  }
}
