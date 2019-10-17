import React from 'react';

function TimeSlot(props) {

  let suffix = (props.hour > 11) ? 'pm' : 'am';
  let time = (props.hour > 12) ? props.hour - 12 : props.hour;

  const renderEmpty = () => {

    return (
      <div className="TimeSlot list-group-item list-group-item-success" onClick={props.onClick}>
        <strong>{time + suffix}</strong>
      </div>
    );
  };

  const renderFull = () => {

    return (

      <div className="TimeSlot list-group-item list-group-item-danger" onClick={props.onClick}>
        <strong>{time + suffix}</strong> - {props.appointment.name} {props.appointment.phoneNumber}
      </div>
    )
  }

  if (props.appointment) {
    return renderFull();
  }

  return renderEmpty();
}

export default TimeSlot;
