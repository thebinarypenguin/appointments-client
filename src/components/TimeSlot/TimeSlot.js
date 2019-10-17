import React from 'react';

function TimeSlot(props) {

  return (
    <div className="TimeSlot" onClick={props.onClick}>
      {props.hour} - {props.appointment && props.appointment.name}
    </div>
  );
}

export default TimeSlot;
