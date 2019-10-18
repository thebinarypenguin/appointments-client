import React from 'react';
import ReactDOM from 'react-dom';
import EditTimeSlotModal from './EditTimeSlotModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditTimeSlotModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
