import { TradesStore } from "./TradesStore";
import { OrdersStore } from "./OrdersStore";
import { CandlesStore } from "./CandlesStore";
import { BooksStore } from "./BooksStore";

export class AppStore {
  constructor() {
    this.tradesStore = new TradesStore(this);
    this.ordersStore = new OrdersStore(this);
    this.candlesStore = new CandlesStore(this);
    this.booksStore = new BooksStore(this);
  }
}
