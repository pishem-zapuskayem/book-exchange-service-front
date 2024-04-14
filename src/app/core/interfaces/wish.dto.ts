import {AccountDTO} from "./account.dto";
import {CategorysDTO} from "./categorys.dto";

export interface WishDTO {
  categoryList: CategorysDTO[];
  accountDTO: AccountDTO;
}
