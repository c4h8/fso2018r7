import * as types from '../actionTypes';

function reducer(state = [], action) {
  switch (action.type) {
  case types.DELETE_NOTIFICATION:
    return state.filter(n => n.id !== action.id);

  default:
    return state;

  }
}

export default reducer;
