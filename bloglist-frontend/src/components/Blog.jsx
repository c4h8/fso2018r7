import React from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, toggleBlog, likeBlog, deleteBlog, username }) => {
  const deleteButton = (!blog.user || blog.user.username === username)
    ?(
      <React.Fragment>
        <button onClick={() => deleteBlog(blog._id)}>
          Delete
        </button>
      </React.Fragment>)
    : null;

  const expandedContent = blog.expanded
    ? (
      <React.Fragment>
        <p>{blog.url}</p>
        <span className="blog-likes"> {`${blog.likes} likes `} </span>
        <button onClick={() => likeBlog(blog._id)}>like</button>
        {deleteButton}
      </React.Fragment>)
    : null;

  return (
    <div className="col-sm-12 border my-2">
      <div className="blog-header" onClick={() => toggleBlog(blog._id)}>{ blog.title } by { blog.author }</div>
      { expandedContent }
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
