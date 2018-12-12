import * as types from '../actionTypes';

function revisedRandId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

const addNotification = payload => ({
  type: types.ADD_NOTIFICATION,
  payload
});

const deleteNotification = id => ({
  type: types.DELETE_NOTIFICATION,
  id
});

export const postNotification = (payload, lifetime = 2) => {
  const id = revisedRandId();

  return dispatch => {
    dispatch(addNotification({...payload, id}));
    setTimeout(() => dispatch(deleteNotification(id)), lifetime * 1000);
  };
};

