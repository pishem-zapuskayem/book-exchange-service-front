import {Component, input, Input} from '@angular/core';
import {ExchangeDto} from "../../../core/interfaces/exchange.dto";
import {ExchangeInfoDTO} from "../../../core/interfaces/exchange-info.dto";
import {MatDialog} from "@angular/material/dialog";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {CategorylistService} from "../../../core/services/categorylist.service";
import {AuthService} from "../../../core/services/auth.service";
import {BookResponseService} from "../../../core/services/book-response.service";
import {FormBuilder} from "@angular/forms";
import {ExchangeCardService} from "../../../core/services/exchange-card.service";
import {ExchangeActiveDTO} from "../../../core/interfaces/exchange-active.dto";
import {TracknumberDTO} from "../../../core/interfaces/tracknumber.dto";
import {RegisterDTO} from "../../../core/interfaces/register.dto";


@Component({
  selector: 'app-active-exchange-card-full-info',
  templateUrl: './active-exchange-card-full-info.component.html',
  styleUrl: './active-exchange-card-full-info.component.scss'
})

export class ActiveExchangeCardFullInfoComponent {
  trackNumber: string = '';
  isValidInput(): boolean {
    return /^\d{14}$/.test(this.trackNumber);
  }
  constructor(public dialog: MatDialog,
              private ExchangeCard: ExchangeCardService,
  ) {
  }

  number!:TracknumberDTO;
  @Input() activeExchange !: ExchangeActiveDTO;

  showForm: boolean = false;
  showText: boolean = false;


  submit() {
    // Выполняем вашу логику при нажатии на кнопку
    if (this.isValidInput()) {
      console.log(this.trackNumber);
      const formData: TracknumberDTO = {trackNumber:this.trackNumber}

      console.log(formData);
      this.ExchangeCard.EnterTrackNumber(this.activeExchange.id, formData).subscribe(x => {
        this.activeExchange.myStatus.trackNumber=this.trackNumber;
      });
      console.log("Поле содержит 14 цифр:", this.trackNumber);
      // Вы можете выполнить вашу логику здесь, когда форма проходит валидацию
    } else {
      console.log("Поле не содержит 14 цифр");
      // Вы можете выполнить другие действия, если ввод не соответствует требованиям
    }
  }
  EnterRecivedBook(idOfExchange:any){
    idOfExchange=this.activeExchange.id;
    this.ExchangeCard.RecivedBook(idOfExchange).subscribe(x => {
      this.activeExchange.myStatus.receiving=true;
    });

  }
}


