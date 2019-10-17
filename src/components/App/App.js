import React from 'react';
import EditTimeSlotModal from '../EditTimeSlotModal/EditTimeSlotModal';
import TimeSlotList from '../TimeSlotList/TimeSlotList';

class App extends React.Component {

  state = {
    appointments: [
      {
        id: 1,
        hour: 9,
        name: 'Alice',
        phoneNumber: '1111111111',
      },
      {
        id: 2,
        hour: 12,
        name: 'Bob',
        phoneNumber: '2222222222',
      },
      {
        id: 3,
        hour: 17,
        name: 'Charlie',
        phoneNumber: '3333333333',
      },
    ],
    editingTimeSlot: null
  };

  handleEditTimeSlotModalSave = (appointment) => {

    if (appointment.id) {

      const newAppointments = this.state.appointments.map(a => {

        if (a.id === appointment.id) {
          return appointment;
        }

        return a;
      });

      this.setState({
        appointments: newAppointments,
        editingTimeSlot: null
      });

    } else {

      appointment.id = this.state.appointments.length + 1;

      this.setState({
        appointments: [...this.state.appointments, appointment],
        editingTimeSlot: null
      });
    }
  }

  handleEditTimeSlotModalCancel = () => {
    this.setState({ editingTimeSlot: null });
  }

  handleTimeSlotListEdit = (hour) => {
    this.setState({ editingTimeSlot: hour });
  };

  render = () => {

    if (this.state.editingTimeSlot) {

      const appointment = this.state.appointments.find(a => {
        return a.hour === this.state.editingTimeSlot}
      );

      return (
        <div className="App">
          <EditTimeSlotModal
            hour={this.state.editingTimeSlot}
            appointment={appointment}
            onSave={this.handleEditTimeSlotModalSave}
            onCancel={this.handleEditTimeSlotModalCancel}
          />
        </div>
      );
    }

    return (
      <div className="App">
        <TimeSlotList
          startHour={9}
          endHour={17}
          appointments={this.state.appointments}
          onEdit={this.handleTimeSlotListEdit}
        />
      </div>
    );
  }
}

export default App;
