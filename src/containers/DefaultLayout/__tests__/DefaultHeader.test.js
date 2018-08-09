import React from 'react';
import ReactDOM from 'react-dom';
import DefaultHeader from '../DefaultHeader';
import { withRouter } from 'react-router'

//jest.mock('react-router-dom'); // <- Use this line

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DefaultHeader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
