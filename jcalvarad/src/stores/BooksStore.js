import { observable, action, computed } from "mobx";

export class BooksStore {
  constructor(appStore) {
    this.appStore = appStore;
  }

  @observable book = "btc_mxn";
  @observable
  availableBooks = [
    {
      book: "btc_mxn",
      minimum_amount: ".003",
      maximum_amount: "1000.00",
      minimum_price: "100.00",
      maximum_price: "1000000.00",
      minimum_value: "25.00",
      maximum_value: "1000000.00"
    },
    {
      book: "eth_mxn",
      minimum_amount: ".003",
      maximum_amount: "1000.00",
      minimum_price: "100.0",
      maximum_price: "1000000.0",
      minimum_value: "25.0",
      maximum_value: "1000000.0"
    }
  ];

  @computed
  get booksList() {
    return this.availableBooks.map(b => {
      return { value: b.book, label: b.book.replace("_", "/").toUpperCase() };
    });
  }

  @computed
  get bookInfo() {
    return this.availableBooks.find(b => {
      return b.book === this.book;
    });
  }

  @action
  setBook = book => {
    this.book = book;
  };

  @action
  setAvailableBooks = availableBooks => {
    this.availableBooks = availableBooks;
  };
}
