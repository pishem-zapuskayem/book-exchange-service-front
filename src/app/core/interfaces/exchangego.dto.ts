
export interface ExchangegoDTO {
  offer: {
    book: {
      bookName: string,
      note: string,
      isbn: string,
      publishYear: number,
      author: {
        lastname: string,
        firstname: string
      }
    },
    offerCategoriesIds: [
      number
    ]
  },
  wish: {
    wishCategoriesIds: [
      number
    ]
  },
  address: {
    addrIndex: number,
    addrCity: string,
    addrStreet: string,
    addrHouse: string,
    addrStructure: string,
    addrApart: string
  }
}
