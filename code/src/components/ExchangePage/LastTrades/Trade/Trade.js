import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatCurrency, formatTime } from '../../../../utils/utilities';
import './Trade.css';

class Trade extends Component {
  constructor(props) {
    super(props);

    this.state = { counter: 5 };
    this._startTimer = this._startTimer.bind(this);
  }

  componentDidMount() {
    this._startTimer();
  }

  componentWillUnmount() { clearInterval(this._timer); }

  _startTimer() {
    this._timer = setInterval(() => {
      this.setState(prevState =>
        Object.assign({}, ...prevState, { counter: prevState.counter - 1 }));
    }, 1000);
  }

  render() {
    const { amount, created_at, maker_side, price } = this.props.trade;
    const newTradeClass = this.state.counter <= 0 ? '' : 'trade-new';
    return (
      <tr className={newTradeClass}>
        <Hour date={new Date(created_at)} />
        <Price
          type={maker_side}
          price={parseFloat(price)} />
        <Amount amount={parseFloat(amount)} />
      </tr>
    );
  }
}

Trade.propTypes = { trade: PropTypes.object.isRequired };

export default Trade;

function Hour({ date }) {
  const hour = formatTime(date);
  return (<td className="trades-hour">{hour}</td>);
}

Hour.propTypes = {
  date: PropTypes.object.isRequired,
};

function Price({ type, price }) {
  const priceClass = type === 'buy' ? 'trades-buy-price' : 'trades-sell-price';
  const formmattedPrice = formatCurrency(price, 2);
  return (
    <td className={priceClass}>{formmattedPrice}</td>
  );
}

Price.propTypes = {
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

function Amount({ amount }) {
  const number = amount.toString().split('.');
  const afterPoint = number[1].length;
  if (afterPoint >= 8) {
    return (<td className="trades-amount">{amount.toFixed(8)}</td>);
  }
  return (
    <td className="trades-amount">
      {amount}
      <span className="dark-text">
        {'0'.repeat(8 - afterPoint)}
      </span>
    </td>
  );
}

Amount.propTypes = {
  amount: PropTypes.number.isRequired,
};
