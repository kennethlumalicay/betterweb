import axios from 'axios';

// Samples
export function fetchAdmins() {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_LOGS', payload: 'fetching admins...' });
    axios({
      url: '/api/fetchAdmins'
    })
      .then(res => {
        dispatch({ type: 'FETCHED_ADMINS', payload: res.data });
      })
      .catch(() => {
        dispatch({ type: 'UPDATE_LOGS', payload: 'FAILED to fetch admins' });
      });
  };
}

export function addAdmin(username, password, hint) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_LOGS', payload: 'adding admin ' + username });
    return axios({
      url: '/api/addAdmin',
      params: {
        username: username,
        password: password,
        hint: hint
      }
    })
      .then(res => {
        dispatch({ type: 'ADDED_ADMIN', payload: res.data });
      })
      .catch(() => {
        dispatch({ type: 'UPDATE_LOGS', payload: 'FAILED to add admin ' + username });
      });
  };
}

export function removeAdmin(id, username) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_LOGS', payload: 'removing admin ' + username });
    return axios({
      url: '/api/removeAdmin',
      params: {
        id: id
      }
    })
      .then(() => {
        dispatch({ type: 'REMOVED_ADMIN', payload: { id: id, username: username } });
      })
      .catch(() => {
        dispatch({ type: 'UPDATE_LOGS', payload: 'FAILED to remove admin ' + username });
      });
  };
}