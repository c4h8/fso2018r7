import * as types from '../actionTypes';
import service from '../services/service';
import { postNotification } from './notificationActions';
import { parseError, errorStyle, infoStyle } from '../utils';

export const setLoggedInUser = payload => ({
  type: types.SET_LOGGED_IN_USER,
  payload
});

const setUsers = payload => ({
  type: types.SET_USERS,
  payload
});

export const getUsers = () => {
  return dispatch => {
    service.getUsers()
      .then(res => dispatch(setUsers(res.data)))
      .catch(e => window.alert('gettin users is kill'));
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch(setLoggedInUser(undefined));
    window.localStorage.removeItem('loggedInUser');
  };
};

export const loginUser = (username, password) => {
  return (dispatch) => {
    service.login(username, password)
      .then(res => {
        const user = res.data ;
        
        dispatch(setLoggedInUser(user));
        window.localStorage.setItem('loggedInUser', JSON.stringify(user));

        dispatch(postNotification({
          message: `logged in as ${user.username}`,
          style: infoStyle
        }));
      })
      .catch(e => this.props.postNotification({
        message: parseError(e),
        style: errorStyle
      }));
  };
};

