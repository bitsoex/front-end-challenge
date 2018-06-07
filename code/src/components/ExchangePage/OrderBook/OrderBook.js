import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OrdersContainer from './OrdersContainer';

const orderBookStyles = {
  // Self
  width: '97%',
  flex: '1 1',
  // for Childs
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-evenly',
};

class OrderBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bids: [],
      asks: [],
      isFirstFetch: false,
    };
  }

  componentDidMount() {
    this._receiveNewOrdersMessage();
  }

  _receiveNewOrdersMessage() {
    const { websocket } = this.props;
    websocket.onmessage = (message) => {
      const { type, payload } = JSON.parse(message.data);

      if (type === 'orders' && payload) {
        const { bids, asks } = payload;

        const formatOrder = (order) => {
          const {  v, a, r, o } = order;
          return {
            id: o,
            price: parseFloat(r),
            amount: parseFloat(a),
            value: parseFloat(v),
          };
        };

        const newBids = bids.map(formatOrder);
        const newAsks = asks.map(formatOrder);

        const isFirstFetch = this.state.bids.length === 0;
        this.setState({ bids: newBids, asks: newAsks, isFirstFetch });
      }
    };
  }

  render() {
    const { book } = this.props;
    const { bids, asks, isFirstFetch } = this.state;
    return (
      <div style={orderBookStyles}>
        <OrdersContainer
          book={book}
          title="POSTURAS DE COMPRA"
          orders={bids}
          isFirstFetch={isFirstFetch}
          type="bid"
        />
        <OrdersContainer
          book={book}
          title="POSTURAS DE VENTA"
          orders={asks}
          isFirstFetch={isFirstFetch}
          type="ask"
        />
      </div>
    );
  }
}

OrderBook.propTypes = {
  book: PropTypes.string.isRequired,
  websocket: PropTypes.object.isRequired,
};

export default OrderBook;
