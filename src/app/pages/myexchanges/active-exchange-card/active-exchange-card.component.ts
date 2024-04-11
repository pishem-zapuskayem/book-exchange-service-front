import {Component, input, Input} from '@angular/core';
import {ExchangeDTO} from "../../../core/interfaces/exchangeDTO";
import {ExchangeInfoDTO} from "../../../core/interfaces/exchange-info.dto";

@Component({
  selector: 'app-active-exchange-card',
  templateUrl: './active-exchange-card.component.html',
  styleUrl: './active-exchange-card.component.scss'
})
export class ActiveExchangeCardComponent {
  @Input() info !: ExchangeInfoDTO;
}


