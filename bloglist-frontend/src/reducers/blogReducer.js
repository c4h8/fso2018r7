import * as types from '../actionTypes';

function reducer(state = [], action) {
  switch (action.type) {
  case types.SET_BLOGS:
    return action.payload;
  case types.DELETE_BLOG:
    return state.filter(blog => blog._id !== action.id);
  case types.ADD_BLOG:
    return [...state, action.payload];
  case types.LIKE_BLOG:
    return state.map(blog => blog._id !== action.id
      ? blog
      : { ...blog, likes: blog.likes + 1 }
    );
  case types.TOGGLE_BLOG:
    return state.map(blog => blog._id !== action.id
      ? blog
      : { ...blog, expanded: !blog.expanded }
    );
  default:
    return state;

  }
}

export default reducer;
