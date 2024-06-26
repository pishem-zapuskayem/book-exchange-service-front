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


@Component({
  selector: 'app-exchange-confirm-card',
  templateUrl: './exchange-confirm-card.component.html',
  styleUrl: './exchange-confirm-card.component.scss'
})

export class ExchangeConfirmCardComponent {


  constructor(public dialog: MatDialog,
              private ExchangeCard: ExchangeCardService,
  ) {
  }

  @Input() info !: ExchangeInfoDTO;

  showForm: boolean = false;
  showText: boolean = false;

  toggle() {
    this.showForm = !this.showForm;
    this.showText = !this.showText;
  }

  EnterExchange( exchangeCard: any)  {
    console.dir(exchangeCard);

    this.ExchangeCard.EnterExchanges(exchangeCard).subscribe(x => {
      this.info.exchangeMeDTO.isAgreed=true;
    });

  }
}


