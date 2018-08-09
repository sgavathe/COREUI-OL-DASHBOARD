import React from 'react';
import ReactDOM from 'react-dom';
import Demographics from './Demographics';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Demographics />, div);
  ReactDOM.unmountComponentAtNode(div);
});
