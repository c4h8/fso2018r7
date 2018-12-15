import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogContainer = ({ blogs }) => (
  <div>
    {blogs.map(blog =>
      <div className="col-sm-12 border my-2 blog-listing" key={blog._id}>
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
});



export default connect(mapStateToProps)(BlogContainer);
