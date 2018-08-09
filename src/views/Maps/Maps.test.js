import React from 'react';
import ReactDOM from 'react-dom';
import Maps from './Maps';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Maps />, div);
  ReactDOM.unmountComponentAtNode(div);
});
