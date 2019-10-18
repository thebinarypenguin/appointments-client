import {
  LOAD_APPOINTMENTS,
  CREATE_APPOINTMENT,
  DELETE_APPOINTMENT,
  UPDATE_APPOINTMENT,
  SHOW_EDIT_APPOINTMENT_MODAL,
  HIDE_EDIT_APPOINTMENT_MODAL,
  SET_ERROR,
} from './actionTypes';

const api = process.env.REACT_APP_API_ROOT;

export const loadAppointments = () => {

  return (dispatch) => {

    return fetch(`${api}/appointments`)
      .then((res) => {

        if (res.status !== 200) {
          return res.json().then(e => Promise.reject(e));
        }

        return res.json();
      })
      .then(appointments => {

        dispatch({
          type: LOAD_APPOINTMENTS,
          appointments,
        });
      })
      .catch(() => {

        dispatch({
          type: SET_ERROR,
          value: new Error('Cannot load appointments'),
        });
      });
  };
};

export const createAppointment = () => {

  return {
    type: SET_ERROR,
    value: new Error('Not Implemented'),
  };
};

export const deleteAppointment = () => {

  return {
    type: SET_ERROR,
    value: new Error('Not Implemented'),
  };
};

export const updateAppointment = () => {

  return {
    type: SET_ERROR,
    value: new Error('Not Implemented'),
  };
};

export const showEditAppointmentModal = (hour) => {

  return {
    type: SHOW_EDIT_APPOINTMENT_MODAL,
    hour,
  };
};

export const hideEditAppointmentModal = () => {

  return {
    type: HIDE_EDIT_APPOINTMENT_MODAL,
    hour: null,
  };
};
