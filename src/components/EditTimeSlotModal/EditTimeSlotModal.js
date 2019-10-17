import React from 'react';

import './EditTimeSlotModal.css';

function EditTimeSlotModal(props) {

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

  const handleDeleteClick = () => {
    props.onDelete(props.appointment.id);
  }

  let suffix = (props.hour > 11) ? 'pm' : 'am';
  let time = (props.hour > 12) ? props.hour - 12 : props.hour;

  const defaultName = (props.appointment) ? props.appointment.name : null;
  const defaultPhoneNumber = (props.appointment) ? props.appointment.phoneNumber : null;

  return (
    <div className="EditTimeSlotModal">
      <h1>Appointment at {time + suffix}</h1>

      <form onSubmit={handleFormSubmit}>



        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="form-control" name="name" defaultValue={defaultName} />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" className="form-control" name="phoneNumber" defaultValue={defaultPhoneNumber} />
        </div>

        <div className="FormControls">
          <div className="left">
            { props.appointment && <button type="button" onClick={handleDeleteClick}>Delete</button> }
          </div>

          <div className="right">
            <button type="button" onClick={handleCancelClick} >Cancel</button>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditTimeSlotModal;
