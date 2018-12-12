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

export const postNotification = (props) => {
  const id = revisedRandId();
  const {message, lifetime, style} = props;

  return dispatch => {
    dispatch(addNotification({message, id, style}));
    setTimeout(() => dispatch(deleteNotification(id)), (lifetime || 2) * 1000);
  };
};

