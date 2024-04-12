import {OfferDTO} from "./offer.dto";
import {ExchangeOfferDTO} from "./exchange-offer.dto";
import {BookDTO} from "./book.dto";
import {CategorysDTO} from "./categorys.dto";

export interface ExchangeActiveDTO {
  id:number;
  myOffer: {
    offerBook: BookDTO;
    isAgreed: boolean;
  },
  otherOffer:{
    categories: CategorysDTO[];
    isAgreed:boolean;
  }
  isFullMatch: boolean;
  myStatus:{
    id:number;
    trackNumber:string;
    receiving:boolean;
  },
  otherStatus:{
  id:number;
  trackNumber:string;
  receiving:boolean;
  },
}
