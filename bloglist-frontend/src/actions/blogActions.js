import * as types from '../actionTypes';
import service from '../services/service';
import { postNotification } from './notificationActions';
import { parseError, errorStyle, infoStyle } from '../utils';

export const toggleBlog = id => ({
  type: types.TOGGLE_BLOG,
  id
});

const deleteBlog = id => ({
  type: types.DELETE_BLOG,
  id
});

export const postDeleteBlog = id => {
  return (dispatch, getState) => {
    const targetBlog = getState().blogs.find(blog => blog._id === id);

    targetBlog && service.deleteBlog(id)
      .then(() => {
        dispatch(deleteBlog(id));
        dispatch(postNotification({
          message: `deleted blog ${targetBlog.title}`,
          style: infoStyle
        }));
      })
      .catch((e) => {
        dispatch(postNotification({
          message: parseError(e),
          style: errorStyle
        }));
      });
  };
};


const setBlogs = payload => ({
  type: types.SET_BLOGS,
  payload
});

export const getBlogs = () => {
  return dispatch => {
    service.getBlogs()
      .then(res => dispatch(setBlogs(res)))
      .catch((e) => {
        dispatch(postNotification({
          message: parseError(e),
          style: errorStyle
        }));
      });
  };
};

const addBlog = payload => ({
  type: types.ADD_BLOG,
  payload
});

export const postBlog = payload => {
  return dispatch => {
    service.submitBlog(payload)
      .then((res) => {
        const newBlog = res.data;

        dispatch(addBlog(newBlog));
        dispatch(postNotification({
          message: `Added ${newBlog.title} by ${newBlog.author}`,
          style: infoStyle,
        }));
      })
      .catch((e) => {
        dispatch(postNotification({
          message: parseError(e),
          style: errorStyle
        }));
      });
  };
};

const likeBlog = id => ({
  type: types.LIKE_BLOG,
  id
});

export const postBlogLike = id => {

  return (dispatch, getState) => {
    const targetBlog = getState().blogs.find(blog => blog._id === id);

    targetBlog && service.likeBlog(targetBlog)
      .then(() => {
        dispatch(likeBlog(id));
        dispatch(postNotification({
          message: `liked blog ${targetBlog.title}`,
          style: infoStyle
        }));
      })
      .catch((e) => {
        dispatch(postNotification({
          message: parseError(e),
          style: errorStyle
        }));
      });
  };
};

const appendBlogComment = (id, message) => ({
  type: types.APPEND_BLOG_COMMENT,
  id,
  message
});

export const postBlogComment = (id, message) => {

  return (dispatch, getState) => {
    const targetBlog = getState().blogs.find(blog => blog._id === id);

    targetBlog && service.commentBlog(id, message)
      .then(() => {
        dispatch(appendBlogComment(id, message));
        dispatch(postNotification({
          message: `commented blog ${targetBlog.title}`,
          style: infoStyle
        }));
      })
      .catch((e) => {
        dispatch(postNotification({
          message: parseError(e),
          style: errorStyle
        }));
      });
  };
};
