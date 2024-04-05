
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
      0
    ]
  },
  wish: {
    wishCategoriesIds: [
      0
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
