import React from 'react';
import { connect } from 'react-redux';
import EditTimeSlotModal from '../EditTimeSlotModal/EditTimeSlotModal';
import TimeSlotList from '../TimeSlotList/TimeSlotList';
import {
  loadAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  showEditAppointmentModal,
  hideEditAppointmentModal,
} from '../../redux/actionCreators';

import './App.css';

class App extends React.Component {

  componentDidMount = () => {
    this.props.loadAppointments();
  }

  handleEditTimeSlotModalSave = (appointment) => {

    // This should be moved into action creators

    const { id, ...payload } = appointment;

    if (id) {
      this.props.updateAppointment(id, payload)
    } else {
      this.props.createAppointment(payload);
    }
  };

  render = () => {

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = (
        <div className="alert alert-danger">
          {this.props.error.message}
        </div>
      );
    }

    if (this.props.editingTimeSlot) {

      const appointment = this.props.appointments.find(a => {
        return a.hour === this.props.editingTimeSlot}
      );

      return (
        <div className="App card">
          <div className="card-body">
            { errorMessage }
            <EditTimeSlotModal
              hour={this.props.editingTimeSlot}
              appointment={appointment}
              onSave={this.handleEditTimeSlotModalSave}
              onCancel={this.props.hideEditAppointmentModal}
              onDelete={this.props.deleteAppointment}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="App card">
        <div className="card-body">
          { errorMessage }
          <h1>Appointments</h1>
          <TimeSlotList
            startHour={9}
            endHour={17}
            appointments={this.props.appointments}
            onEdit={this.props.showEditAppointmentModal}
          />
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    appointments    : state.appointments,
    editingTimeSlot : state.editingTimeSlot,
    error           : state.error,
  }
}

const mapDispatchToProps = {
  loadAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  showEditAppointmentModal,
  hideEditAppointmentModal,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
