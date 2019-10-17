import React from 'react';

function EditTimeSlotModal(props) {

  // hour,appointment,onSave,onCancel

  const handleFormSubmit = (ev) => {

    ev.preventDefault();

    const { name, phoneNumber }  = ev.target;

    const appointmentId = (props.appointment) ? props.appointment.id : null;

    props.onSave({
      id          : appointmentId,
      hour        : props.hour,
      name        : name.value,
      phoneNumber : phoneNumber.value,
    });
  };

  const handleCancelClick = () => {
    props.onCancel();
  }

  if (props.appointment) {

  }

  const defaultName = (props.appointment) ? props.appointment.name : null;
  const defaultPhoneNumber = (props.appointment) ? props.appointment.phoneNumber : null;

  return (
    <div className="EditTimeSlotModal">
      <h1>Editing Time Slot {props.hour}</h1>

      <form onSubmit={handleFormSubmit}>
        <input type="text" id="name" name="name" defaultValue={defaultName} />
        <input type="text" id="phoneNumber" name="phoneNumber" defaultValue={defaultPhoneNumber} />
        <button type="button" onClick={handleCancelClick} >Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditTimeSlotModal;
