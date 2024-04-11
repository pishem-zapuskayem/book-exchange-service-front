import {Component, Input} from '@angular/core';
import {ExchangeDTO} from "../../../core/interfaces/exchangeDTO";

@Component({
  selector: 'app-exchange-card',
  templateUrl: './exchange-card.component.html',
  styleUrl: './exchange-card.component.scss'
})
export class ExchangeCardComponent {
@Input() exchange !: ExchangeDTO;
}
