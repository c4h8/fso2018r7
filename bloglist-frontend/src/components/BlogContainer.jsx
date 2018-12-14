import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as blogActions from '../actions/blogActions';
import Blog from './Blog';
import { Link } from 'react-router-dom';

const BlogContainer = ({ blogs, toggleBlog, likeBlog, deleteBlog, user }) => (
  <div>
    {blogs.map(blog =>
      <div className="col-sm-12 border my-2" key={blog._id}>
        <h5 className="mt-2"><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></h5>
        <p className="my-2">by <em>{blog.author}</em></p>
      </div>
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
