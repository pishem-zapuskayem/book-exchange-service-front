import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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



  user !: AccountDTO;
  isLoading: boolean = false;
  subscription = new Subscription();
  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private message: NzMessageService,
              public authService:  AuthService,
              public AuthRedirectService:  AuthredirectService,
  )
  {}

  ngOnInit() {

    if (this.authService.isAuthenticated()) {
      this.isLoading = true;
      const observer: Observer<AccountDTO> = {
        complete: () => {
        },

        error: (err: any) => {
          this.authService.signOut()
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
