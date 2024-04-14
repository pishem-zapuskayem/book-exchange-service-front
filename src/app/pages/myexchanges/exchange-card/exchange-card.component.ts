import {Component, Input} from '@angular/core';
import {ExchangeDto} from "../../../core/interfaces/exchange.dto";

@Component({
  selector: 'app-exchange-card',
  templateUrl: './exchange-card.component.html',
  styleUrl: './exchange-card.component.scss'
})
export class ExchangeCardComponent {
@Input() exchange !: ExchangeDto;
}
