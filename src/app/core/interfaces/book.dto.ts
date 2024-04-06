import {AuthorDTO} from "./author.dto";

export interface BookDTO {
  bookName: string;
  note: string;
  isbn: string;
  publishYear: number;
  author: AuthorDTO;
}
