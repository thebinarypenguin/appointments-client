import {
  LOAD_APPOINTMENTS,
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
