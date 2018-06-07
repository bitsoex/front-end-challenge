import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../../../utils/utilities';
import './Order.css';

class Order extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
      counter: 3,
      isFirstFetch: undefined,
    };

    this._toogleOrder = this._toogleOrder.bind(this);
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

  _toogleOrder() {
    this.setState(prevState =>
      Object.assign({}, ...prevState, { isSelected: !prevState.isSelected }));
  }

  render() {
    const {
      sum, weight, amount, value, price,
    } = this.props.order;
    const { isSelected, counter, isFirstFetch } = this.state;
    const selectedOrderClass = isSelected ? 'order-selected' : '';
    const newOrderClass = (isFirstFetch || counter <= 0) ? '' : 'order-new';
    return (
      <tr
        className={`${newOrderClass + selectedOrderClass}`}
        onClick={this._toogleOrder}>
        <Sum
          sum={sum}
          weight={weight} />
        <Amount amount={amount} />
        <Value value={value} />
        <Price price={price} />
      </tr>
    );
  }
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
  isFirstFetch: PropTypes.bool.isRequired,
};

export default Order;

function Sum({ sum, weight }) {
  return (
    <td className="order-sum">
      <div className="order-sum-bar" style={{ width: weight }} />
      <span>{sum.toFixed(2)}</span>
    </td>
  );
}

Sum.propTypes = {
  sum: PropTypes.number.isRequired,
  weight: PropTypes.number.isRequired,
};

function Amount({ amount }) {
  const number = amount.toString().split('.');
  const isInt = number.length < 2;
  const afterPoint = isInt ? 0 : number[1].length;
  if (afterPoint >= 8) {
    return (<td>{amount.toFixed(8)}</td>);
  }
  return (
    <td>
      {amount}
      <span className="dark-text">
        {'0'.repeat(8 - afterPoint)}
      </span>
    </td>
  );
}

Amount.propTypes = { amount: PropTypes.number.isRequired };

function Value({ value }) {
  const formmattedValue = formatCurrency(value, 2);
  return (
    <td className="orders-value">{formmattedValue}</td>
  );
}

Value.propTypes = { value: PropTypes.number.isRequired };

function Price({ price }) {
  const formmattedPrice = formatCurrency(price, 2);
  return (
    <td className="orders-price">{formmattedPrice}</td>
  );
}

Price.propTypes = { price: PropTypes.number.isRequired };
