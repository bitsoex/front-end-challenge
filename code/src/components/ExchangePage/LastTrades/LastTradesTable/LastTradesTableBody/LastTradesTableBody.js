import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './LastTradesTableBody.css';
import { formatCurrency, formatTime } from '../../../../../utils/utilities';

function LastTradesTableBody({ trades }) {
  let isFirst = true;
  const rows = trades.map((trade, index) => {
    if (index !== 0) isFirst = false;
    return (
      <Trade
        key={trade.tid}
        trade={trade}
        isFirst={isFirst} />
    );
  });
  return (  
    <tbody className="trades-table-body">
      {rows}
    </tbody>
  );
}

LastTradesTableBody.propTypes = {
  trades: PropTypes.array.isRequired,
};

export default LastTradesTableBody;

function Trade({ trade, isFirst }) {
  const { amount, created_at, maker_side, price } = trade;
  return (
    <tr className={isFirst ? 'trades-active' : ''}>
      <Hour date={new Date(created_at)} />
      <Price
        type={maker_side}
        price={parseFloat(price)} />
      <Amount amount={parseFloat(amount)} />
    </tr>
  );
}

Trade.propTypes = {
  trade: PropTypes.object.isRequired,
  isFirst: PropTypes.bool.isRequired,
};

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
