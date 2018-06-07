import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatCurrency, formatTime } from '../../../../utils/utilities';
import './Trade.css';

class Trade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 5,
      isFirstFetch: undefined,
    };
    this._startTimer = this._startTimer.bind(this);
  }

  componentWillMount() {
    const { isFirstFetch } = this.props;
    this.setState({ isFirstFetch });
  }

  componentDidMount() {
    this._startTimer();
  }

  componentWillUnmount() { clearInterval(this._timer); }

  _startTimer() {
    this._timer = setInterval(() => {
      this.setState((prevState) => {
        const oldCount = prevState.counter;
        if (oldCount <= 1) clearInterval(this._timer);
        const newCount = oldCount <= 1 ? 0 : oldCount - 1;
        return Object.assign({}, ...prevState, { counter: newCount });
      });
    }, 1000);
  }

  render() {
    const { amount, created_at, maker_side, price } = this.props.trade;
    const { isFirstFetch, counter } = this.state;
    const newTradeClass = (isFirstFetch || counter <= 0) ? '' : 'trade-new';
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

Trade.propTypes = {
  trade: PropTypes.object.isRequired,
  isFirstFetch: PropTypes.bool.isRequired,
};

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
  const isInt = number.length < 2;
  const afterPoint = isInt ? 0 : number[1].length;
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
