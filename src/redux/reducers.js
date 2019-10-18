import {
  LOAD_APPOINTMENTS,
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
