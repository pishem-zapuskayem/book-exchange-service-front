import {OfferDTO} from "./offer.dto";
import {ExchangeOfferDTO} from "./exchange-offer.dto";

export interface ExchangeDTO {
  offerFirst: ExchangeOfferDTO;
  offerSecond: ExchangeOfferDTO;
  isFullMatch: boolean;
}
