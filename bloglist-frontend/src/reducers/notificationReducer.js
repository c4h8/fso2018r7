import * as types from '../actionTypes';

function reducer(state = [], action) {
  switch (action.type) {
  case types.DELETE_NOTIFICATION:
    return state.filter(n => n.id !== action.id);
  case types.ADD_NOTIFICATION:
    return [...state, action.payload];
  default:
    return state;

  }
}

export default reducer;
