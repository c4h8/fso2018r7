import React from 'react';
import propTypes from 'prop-types';

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className="blog-header">
      {blog.title} {blog.author}
    </div>
    <div className="blog-details">
      blog has {blog.likes} likes
      <button className="like-button" onClick={onClick}>like</button>
    </div>
  </div>
);

SimpleBlog.propTypes = ({
  blog: propTypes.instanceOf(Object),
  onClick: propTypes.func
});

export default SimpleBlog;
