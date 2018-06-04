import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LastTradesTableHeader from './LastTradesTableHeader/LastTradesTableHeader';
import LastTradesTableBody from './LastTradesTableBody/LastTradesTableBody';

const tableStyles = {
  width: '100%',
  borderCollapse: 'collapse',
};

function LastTradesTable({ book, trades }) {
  return (
    <table style={tableStyles}>
      <LastTradesTableHeader book={book} />
      <LastTradesTableBody trades={trades} />
    </table>
  );
}

LastTradesTable.propTypes = {
  trades: PropTypes.array.isRequired,
  book: PropTypes.string.isRequired,
};

export default LastTradesTable;
