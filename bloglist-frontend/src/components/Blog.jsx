import React from 'react';
import PropTypes from 'prop-types';

const blogStyle = ({
  paddingTop: 10,
  paddingLeft: 2,
  backgroundColor: '#e5e5e5',
  margin: '10px 0px',
  boxSizing: 'border-box'
});

const Blog = ({ blog, toggleBlog, likeBlog, deleteBlog, username }) => {
  const deleteButton = (!blog.user || blog.user.username === username)
    ?(
      <React.Fragment>
        <button onClick={() => deleteBlog(blog._id)}>
          Delete
        </button>
      </React.Fragment>)
    : null;

  const payload = blog.expanded
    ? (
      <React.Fragment>
        <p>{blog.url}</p>
        <span className="blog-likes"> {`${blog.likes} likes `} </span>
        <button onClick={() => likeBlog(blog)}>like</button>
        {deleteButton}
      </React.Fragment>)
    : null;

  return (
    <div style={blogStyle}>
      <div className="blog-header" onClick={() => toggleBlog(blog._id)}>{ blog.title } { blog.author }</div>
      { payload }
    </div>);
};

Blog.propTypes = ({
  blog: PropTypes.instanceOf(Object),
  toggleBlog: PropTypes.func,
  likeBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  username: PropTypes.string
});

export default Blog;
