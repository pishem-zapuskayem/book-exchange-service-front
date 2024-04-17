import {AddressDTO} from "./address.dto";

export interface RegisterDTO {
  address: AddressDTO[],
  lastName: string,
  firstName: string,
  secondName: string,
  email: string,
  username: string,
  password: string,
}
