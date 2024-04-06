import {OfferDTO} from "./offer.dto";

export interface ExchangesDTO {
  offerFirst: OfferDTO;
  offerSecond: OfferDTO;
  isFullMatch: boolean;
}
