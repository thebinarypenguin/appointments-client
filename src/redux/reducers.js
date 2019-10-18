import {
  LOAD_APPOINTMENTS,
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
  SHOW_EDIT_APPOINTMENT_MODAL,
  HIDE_EDIT_APPOINTMENT_MODAL,
  SET_ERROR,
} from './actionTypes';

const initialState = {
  appointments: [],
  editingTimeSlot: null,
  error: null,
};

const rootReducer = (state = initialState, action) => {

  switch(action.type) {

    case LOAD_APPOINTMENTS:
      return {
        appointments: [...action.appointments],
        editingTimeSlot: state.editingTimeSlot,
        error: null,
      };

    case CREATE_APPOINTMENT:
      return {
        appointments: [...state.appointments, action.appointment],
        editingTimeSlot: null,
        error: null,
      };

    case DELETE_APPOINTMENT:

      const deleted = state.appointments.filter(a => {
        return a.id !== action.id;
      });

      return {
        appointments: deleted,
        editingTimeSlot: null,
        error: null,
      };

    case UPDATE_APPOINTMENT:

      const updated = state.appointments.map(a => {

        return (a.id === action.appointment.id) ? action.appointment : a;
      });

      return {
        appointments: updated,
        editingTimeSlot: null,
        error: null,
      };

    case SHOW_EDIT_APPOINTMENT_MODAL:
      return {
        appointments: [...state.appointments],
        editingTimeSlot: action.hour,
        error: null,
      };

    case HIDE_EDIT_APPOINTMENT_MODAL:
      return {
        appointments: [...state.appointments],
        editingTimeSlot: null,
        error: null,
      };

    case SET_ERROR:
      return {
        appointments: [...state.appointments],
        editingTimeSlot: state.editingTimeSlot,
        error: new Error(action.value),
      };

    default:
      return state;
  }
};

export default rootReducer;
