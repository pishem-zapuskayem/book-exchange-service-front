import {AddressDTO} from "./address.dto";

export interface AccountDTO {
  lastName: string,
  firstName: string,
  secondName: string,
  email: string,
  username: string,
  urlAvatar: string,
  addresses:AddressDTO[],
}
