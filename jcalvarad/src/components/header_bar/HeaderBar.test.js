import React from 'react';
import ReactDOM from 'react-dom';
import HeaderBar from './HeaderBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
