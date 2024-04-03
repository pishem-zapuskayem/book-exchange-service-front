import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";



@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})

export class ConfirmComponent {
  message: string='Загрузка...';
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let data = params['token'] || null;
      if (data) {
        this.authService.confirmRegistration(data)
          .subscribe(res => {
            this.message='Почта подтверждена'
          }, err => {
            if (err) {
              this.message='Не удалось подтвердить почту'
            }
          })
      } else {
        this.message='Токен не найден'
      }
    })
  }
}
