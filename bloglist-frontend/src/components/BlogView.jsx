import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as blogActions from '../actions/blogActions';

const BlogView = ({blog, likeBlog, deleteBlog, user}) => {
  if(!blog) return (
    <div>
      no blog with this id
    </div>
  );

  const deleteButton = (!blog.user || blog.user.username === (user && user.username))
    ?(
      <button className="btn btn-danger float-right" onClick={() => deleteBlog(blog._id)}>
        Delete
      </button>)
    : null;


  return (
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <p>{blog.url}</p>
      <p>added by {blog.user ? blog.user.username : 'anonymous'}</p>
      <div className="clearfix">
        likes: {blog.likes}
        <button className="btn btn-primary ml-3" onClick={() => likeBlog(blog._id)}>like</button>
        {deleteButton}
      </div>
    </div>
  );
};

BlogView.propTypes = ({
  user: PropTypes.instanceOf(Object),
  blog: PropTypes.instanceOf(Object),
  likeBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
});

const mapStateToProps = (state, ownProps) => ({
  user: state.users.loggedInUser,
  blog: state.blogs.find(blog => blog._id === ownProps.id)
});

const mapDispatchToProps = dispatch => ({
  likeBlog: id => dispatch(blogActions.postBlogLike(id)),
  deleteBlog: id => dispatch(blogActions.postDeleteBlog(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogView);