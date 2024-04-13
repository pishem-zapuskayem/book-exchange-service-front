import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/services/auth.service";
import {AuthDialogComponent} from "../../../auth-dialog/auth-dialog.component";
import {MatDialog} from "@angular/material/dialog";



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
    private router: Router,
    public dialog: MatDialog,
  ) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let data = params['token'] || null;
      if (data) {
        this.authService.confirmRegistration(data)
          .subscribe(res => {
            this.message='Почта подтверждена'
            this.router.navigate(['/home'])
            this.dialog.open(AuthDialogComponent);
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
