import * as types from '../actionTypes';

function reducer(state = {loggedInUser: undefined, users: []}, action) {
  switch (action.type) {
  case types.SET_LOGGED_IN_USER:
    return { ...state, loggedInUser: action.payload };
  case types.SET_USERS:
    return { ...state, users: action.payload };
  default:
    return state;
  }
}

export default reducer;
