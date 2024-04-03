import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import {AuthDialogComponent} from "../../../auth-dialog/auth-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
import {Observer, Subscription} from "rxjs";
import {AccountDTO} from "../../../core/interfaces/account.dto";
import {AuthService} from "../../../core/services/auth.service";
import {AuthredirectService} from "../../../core/services/authredirect.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  needExchange!: FormGroup;
  Wanted!: FormGroup;
  InfoDetail!: FormGroup;
  exchange_step = false;
  wanted_step = false;
  info_step = false;
  step = 1;
  user !: AccountDTO;
  isLoading: boolean = false;
  subscription = new Subscription();
  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private message: NzMessageService,
  public authService:  AuthService,
              public AuthRedirectService:  AuthredirectService,
  ) {
  }

  ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.isLoading = true;
      const observer: Observer<AccountDTO> = {
        complete: () => {
        },

        error: (err: any) => {
        },

        next: (value: AccountDTO) => {
          this.isLoading = false;
          console.log(value)
          this.user = value;
        }
      }
      this.authService.getAuthenticated().subscribe(observer);
    }
    // Подписываемся на событие
    const onLogin = this.AuthRedirectService.onLogin.subscribe(() => {
      this.dialog.closeAll();
    });

    // Добавляем подписку в набор подписок
    this.subscription.add(onLogin);
  }

  ngOnDestroy() {
    // Отписываемся от всех подписок при уничтожении компонента
    this.subscription.unsubscribe();
  }


  next() {
    if (this.step == 1) {
      this.exchange_step = true;
      if (this.needExchange.invalid) {
        return
      }
      this.step++
    }
    if (this.step == 2) {
      this.wanted_step = true;
      if (this.Wanted.invalid) {
        return
      }
      this.step++;
    }
  }

  previous() {
    this.step--
    if (this.step == 1) {
      this.exchange_step = false;
    }
    if (this.step == 2) {
      this.info_step = false;
    }
  }

  submit() {
    if (this.step == 3) {
      this.info_step = true;
      if (this.InfoDetail.invalid) {
        return
      }
    }
  }

  showLogin() {
    this.dialog.open(AuthDialogComponent);
  }

  createMessage(type: string): void {
    this.message.create(type, `Данный раздел доступен только авторизованному пользователю`);
  }

  getAvatarOrDefault(user: AccountDTO): string {
    return user.urlAvatar != undefined ? user.urlAvatar : "assets/1.png";
  }
}
