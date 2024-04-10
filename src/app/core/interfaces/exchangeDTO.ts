import {OfferDTO} from "./offer.dto";
import {ExchangeOfferDTO} from "./exchange-offer.dto";

export interface ExchangeDTO {
  id:number;
  offerFirst: ExchangeOfferDTO;
  offerSecond: ExchangeOfferDTO;
  isFullMatch: boolean;
}
