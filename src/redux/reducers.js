import {
  LOAD_APPOINTMENTS,
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
