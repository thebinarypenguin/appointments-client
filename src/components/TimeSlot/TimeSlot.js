import React from 'react';

function TimeSlot(props) {

  let time = (props.hour > 12) ? props.hour - 12 : props.hour;

  if (time > 11) { time += ' pm' }
  else { time += ' am' }

  return (
    <div className="TimeSlot" onClick={props.onClick}>
      <strong>{time}</strong> - {props.appointment && props.appointment.name} {props.appointment && props.appointment.phoneNumber}
    </div>
  );
}

export default TimeSlot;
