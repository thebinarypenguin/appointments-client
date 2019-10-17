import React from 'react';
import EditTimeSlotModal from '../EditTimeSlotModal/EditTimeSlotModal';
import TimeSlotList from '../TimeSlotList/TimeSlotList';
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

    return getAppointments()
      .then(appointments => {
        this.setState({ appointments, error: null });
      })
      .catch(err => {
        this.setState({ error: err });
      });
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
    if (this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          {this.state.error.message}
        </div>
      );
    }

    if (this.state.editingTimeSlot) {

      const appointment = this.state.appointments.find(a => {
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
            appointments={this.state.appointments}
            onEdit={this.handleTimeSlotListEdit}
          />
        </div>
      </div>
    );
  };
}

export default App;
