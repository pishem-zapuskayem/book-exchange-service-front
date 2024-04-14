import {Component, Input} from '@angular/core';
import {ExchangeDto} from "../../../core/interfaces/exchange.dto";
import {ExchangeActiveDTO} from "../../../core/interfaces/exchange-active.dto";

@Component({
  selector: 'app-active-exchange-card',
  templateUrl: './active-exchanges-card.component.html',
  styleUrl: './active-exchanges-card.component.scss'
})
export class ActiveExchangesCardComponent {
@Input() exchangeActive !: ExchangeDto;
}
