import {BookDTO} from "./book.dto";
import {CategorysDTO} from "./categorys.dto";
export interface OfferDTO {
  bookDTO: BookDTO;
  categoryDTOList: CategorysDTO[];
}


