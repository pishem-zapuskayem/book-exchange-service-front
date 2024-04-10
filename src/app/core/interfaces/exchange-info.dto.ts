import {OfferDTO} from "./offer.dto";
import {ExchangeOfferDTO} from "./exchange-offer.dto";
import {BookDTO} from "./book.dto";
import {CategorysDTO} from "./categorys.dto";

export interface ExchangeInfoDTO {
  ExchangeMeDTO: {
    offerBook: BookDTO;
    isAgreed: boolean;
  },
  exchangeGiveDTO:{
    categories: CategorysDTO[];
    isAgreed:boolean;
  }
}
