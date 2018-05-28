import React from 'react';
import PropTypes from 'prop-types';

const HeaderIndicators = ({ indicators }) => (
  <div className="currency-indicators">
    <div>
      <span>Volumen 24 Hrs.</span> {indicators.last24hours} BTC
    </div>
    <div>
      <span>Max.</span>
      {indicators.max} MXN
    </div>
    <div>
      <span>Min.</span>
      {indicators.min} MXN
    </div>
    <div>
      <span>Variación.</span> {indicators.variation.amount} MXN ({indicators.variation.perc})
    </div>
  </div>
);

HeaderIndicators.propTypes = {
  indicators: PropTypes.object,
};

HeaderIndicators.defaultProps = {
  indicators: {
    last24hours: '123,456.789',
    max: '123,456.78',
    min: '123,456.78',
    variation: { amount: '+1,234.56', perc: '7,8%' },
  },
};

export default HeaderIndicators;
