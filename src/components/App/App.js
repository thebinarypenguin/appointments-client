import React from 'react';
import { connect } from 'react-redux';
import EditTimeSlotModal from '../EditTimeSlotModal/EditTimeSlotModal';
import TimeSlotList from '../TimeSlotList/TimeSlotList';
import {
  loadAppointments,
} from '../../redux/actionCreators';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../../services/appointments';

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

  handleEditTimeSlotModalCancel = () => {
    this.setState({ editingTimeSlot: null, error: null });
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

  handleTimeSlotListEdit = (hour) => {
    this.setState({ editingTimeSlot: hour, error: null });
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

    if (this.state.editingTimeSlot) {

      const appointment = this.props.appointments.find(a => {
        return a.hour === this.state.editingTimeSlot}
      );

      return (
        <div className="App card">
          <div className="card-body">
            { errorMessage }
            <EditTimeSlotModal
              hour={this.state.editingTimeSlot}
              appointment={appointment}
              onSave={this.handleEditTimeSlotModalSave}
              onCancel={this.handleEditTimeSlotModalCancel}
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
            onEdit={this.handleTimeSlotListEdit}
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

const mapDispatchToProps = { loadAppointments }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
