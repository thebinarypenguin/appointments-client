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

export const createAppointment = (payload) => {

  return (dispatch) => {

    return fetch(`${api}/appointments`, {
      method: 'POST',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {

        if (res.status !== 201) {
          return res.json().then(e => Promise.reject(e));
        }

        return res.json();
      })
      .then(appointment => {

        dispatch({
          type: CREATE_APPOINTMENT,
          appointment,
        });
      })
      .catch(() => {

        dispatch({
          type: SET_ERROR,
          value: new Error('Cannot create appointment'),
        });
      });
  };
};

export const deleteAppointment = (id) => {

  return (dispatch) => {

    return fetch(`${api}/appointments/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {

        if (res.status !== 204) {
          return res.json().then(e => Promise.reject(e));
        }
      })
      .then(() => {

        dispatch({
          type: DELETE_APPOINTMENT,
          id,
        });
      })
      .catch(() => {

        dispatch({
          type: SET_ERROR,
          value: new Error('Cannot delete appointment'),
        });
      });
  };
};

export const updateAppointment = (id, payload) => {

  return (dispatch) => {

    return fetch(`${api}/appointments/${id}`, {
      method: 'PUT',
      headers : {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {

        if (res.status !== 200) {
          return res.json().then(e => Promise.reject(e));
        }

        return res.json();
      })
      .then(appointment => {

        dispatch({
          type: UPDATE_APPOINTMENT,
          appointment,
        });
      })
      .catch(() => {

        dispatch({
          type: SET_ERROR,
          value: new Error('Cannot update appointment'),
        });
      });
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
