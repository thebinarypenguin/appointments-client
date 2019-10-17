
const api = process.env.REACT_APP_API_ROOT;

const getAppointments = () => {

  return fetch(`${api}/appointments`)
    .then((res) => {

      if (res.status !== 200) {
        return res.json().then(e => Promise.reject(e));
      }

      return res.json();
    });
};

const createAppointment = (payload) => {

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
    });
};

const updateAppointment = (id, payload) => {

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
    });
};

const deleteAppointment = (id) => {

  return fetch(`${api}/appointments/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {

      if (res.status !== 204) {
        return res.json().then(e => Promise.reject(e));
      }
    });
};

export {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
}
