import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import {AuthDialogComponent} from "../../../auth-dialog/auth-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
import {Observer} from "rxjs";
import {AccountDTO} from "../../../core/interfaces/account.dto";
import {AuthService} from "../../../core/services/auth.service";
import {ExchangegoDTO} from "../../../core/interfaces/exchangego.dto";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
@Component({
  selector: 'app-multistep',
  templateUrl: './start-change.component.html',
  styleUrls: ['./start-change.component.scss']
})
export class StartChangeComponent implements OnInit {
  needExchange!: FormGroup;
  Wanted!: FormGroup;
  InfoDetail!: FormGroup;
  exchange_step = false;
  wanted_step = false;
  info_step = false;
  step = 1;
  user !: AccountDTO;
  isLoading: boolean = false;
  isSubmitted = false;
  error = false;
  constructor(private formBuilder: FormBuilder,
              public dialog: MatDialog,
              private message: NzMessageService,
  public authService:  AuthService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.needExchange = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      bookName: ['', Validators.required],
      publishYear: ['', Validators.required],
      isbn: ['']
    });
    this.Wanted = this.formBuilder.group({
      WannaTake: ['', Validators.required],
    });
    this.InfoDetail = this.formBuilder.group({
      addrCity: ['', Validators.required],
      addrStreet: ['', Validators.required],
      addrStructure: ['', Validators.required],
      addrHouse: ['', Validators.required],
      addrApart: [''],
      addrIndex: ['', Validators.required],
    });
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
  }

  get trade() {
    return this.needExchange.controls;
  }

  get want() {
    return this.InfoDetail.controls;
  }

  get info() {
    return this.Wanted.controls;
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
    this.isSubmitted = true;

    const formData: ExchangegoDTO = {...this.needExchange.value, ...this.InfoDetail.value}
    // @ts-ignore
    formData.address = {...formData}
    console.dir(formData);
    console.log("1");
    const observer: Observer<HttpResponse<any>> = {
      complete: () =>  {
      },

      error: (err: any) => {
        console.log("2");
        this.error = true;
        this.isSubmitted = false;
      },

      next: (value: HttpResponse<any>) => {
        this.isSubmitted = false;
        this.error = false;
        console.log("3");
      }
    }

    this.authService.Exchanging(formData).subscribe(observer);
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
