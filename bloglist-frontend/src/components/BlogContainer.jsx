import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as blogActions from '../actions/blogActions';
import Blog from './Blog';

const BlogContainer = ({ blogs, toggleBlog, likeBlog, deleteBlog, user }) => (
  <div>
    {blogs.map(blog =>
      <Blog
        key={blog._id}
        blog={blog}
        toggleBlog={toggleBlog}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
        username={user && user.username}
      />
    )}
  </div>
);

BlogContainer.propTypes = ({
  blogs: PropTypes.arrayOf(Object),
  user: PropTypes.instanceOf(Object),
  toggleBlog: PropTypes.func,
  likeBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
});

const mapStateToProps = state => ({
  blogs: state.blogs.sort((a, b) => b.likes- a.likes),
  user: state.users.loggedInUser
});

const mapDispatchToProps = dispatch => ({
  toggleBlog: id => dispatch(blogActions.toggleBlog(id)),
  likeBlog: id => dispatch(blogActions.postBlogLike(id)),
  deleteBlog: id => dispatch(blogActions.postDeleteBlog(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);
