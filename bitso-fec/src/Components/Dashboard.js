import React from "react";
import moment from "moment";
import Trades from "./Trades";
import Orders from "./Orders";
import Charts from "./Charts";
import OrderData from "../Modules/OrderData";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.websocket = new WebSocket("wss://ws.bitso.com");
    this.state = {
      orders: null,
      trades: null
    };

    this.websocket.onopen = e => {
      console.log(e);
      this.websocket.send(
        JSON.stringify({
          action: "subscribe",
          book: props.book,
          type: "trades"
        })
      );
      this.websocket.send(
        JSON.stringify({
          action: "subscribe",
          book: props.book,
          type: "diff-orders"
        })
      );
      this.websocket.send(
        JSON.stringify({
          action: "subscribe",
          book: props.book,
          type: "orders"
        })
      );
    };
  }

  componentDidMount() {
    console.log("Hola Dashboard");
    const { book } = this.props;

    this.websocket.onmessage = message => {
      var data = JSON.parse(message.data);
      if (data.type === "diff-orders" && data.payload) {
        const orderedOrders = OrderData(this.props.firstOrders, data);
        setTimeout(this.setState({ orders: orderedOrders }), 100);
        console.log(data.book, orderedOrders);
      } else if (data.type === "trades" && data.payload) {
        const trades = this.props.firstTrades;
        const { a, i, r, t } = data.payload[0];
        const trade = {
          book,
          created_at: moment().toISOString(),
          amount: a,
          maker_side: t === 0 ? "buy" : "sell",
          price: r,
          tid: i
        };
        trades.unshift(trade);
        this.setState({ trades });
      }
    };
  }

  componentWillUnmount() {
    this.websocket.close();
  }

  render() {
    const { book, firstTrades } = this.props;
    const { orders, trades } = this.state;

    return (
      <div className="dashboard-container">
        <Trades book={book} trades={trades || firstTrades} />
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            paddingLeft: "1rem"
          }}
        >
          <Charts book={book} orders={orders} />
          <Orders book={book} orders={orders} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
