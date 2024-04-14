
import {AccountDTO} from "./account.dto";
import {BookDTO} from "./book.dto";
export interface BookNoteDTO {
  note: string;
  response: string;
  bookLiterary: BookDTO;
  account: AccountDTO;
}
