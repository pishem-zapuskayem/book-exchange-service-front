import {BookDTO} from "./book.dto";
import {CategorysDTO} from "./categorys.dto";
import {AuthorDTO} from "./author.dto";
export interface ExchangeOfferDTO {
  bookName: string,
  note: string,
  isbn: string,
  publishYear: string,
  author:AuthorDTO,
}


