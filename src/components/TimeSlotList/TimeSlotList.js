import React from 'react';
import TimeSlot from '../TimeSlot/TimeSlot';

function TimeSlotList(props) {

  const slots = [];

  for (let hour = props.startHour; hour <= props.endHour; hour++) {

    const app = props.appointments.find(a => {
      return a.hour === hour;
    });

    slots.push(
      <li key={hour}>
        <TimeSlot
          hour={hour}
          appointment={app}
          onClick={() => { props.onEdit(hour)}}
        />
      </li>
    );
  }

  return (
    <ul className="TimeSlotList">
      {slots}
    </ul>
  );
}

export default TimeSlotList;
