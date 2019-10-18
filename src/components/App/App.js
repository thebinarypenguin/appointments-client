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

  state = {
    appointments: [],
    editingTimeSlot: null,
    error: null,
  };

  componentDidMount = () => {
    this.props.loadAppointments();
  }

  handleEditTimeSlotModalSave = (appointment) => {

    if (appointment.id) {

      const { id, ...payload } = appointment;

      return updateAppointment(id, payload)
        .then(() => {

          const newAppointments = this.state.appointments.map(a => {

            if (a.id === appointment.id) {
              return appointment;
            }

            return a;
          });

          this.setState({
            appointments: newAppointments,
            editingTimeSlot: null,
            error: null,
          });

        })
        .catch(err => {
          this.setState({ error: err });
        });

    } else {

      const { id, ...payload } = appointment;

      return createAppointment(payload)
        .then((appointment) => {

          this.setState({
            appointments: [...this.state.appointments, appointment],
            editingTimeSlot: null,
            error: null,
          });
        })
        .catch(err => {
          this.setState({ error: err });
        });
    }
  }

  handleEditTimeSlotModalDelete = (appointmentId) => {

    return deleteAppointment(appointmentId)
      .then(() => {

        const newAppointments = this.state.appointments.filter(a => {
          return a.id !== appointmentId;
        });

        this.setState({
          appointments: newAppointments,
          editingTimeSlot: null,
          error: null,
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
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
              onDelete={this.handleEditTimeSlotModalDelete}
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
