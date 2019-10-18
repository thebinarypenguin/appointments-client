import React from 'react';
import ReactDOM from 'react-dom';
import TimeSlot from './TimeSlot';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimeSlot />, div);
  ReactDOM.unmountComponentAtNode(div);
});
