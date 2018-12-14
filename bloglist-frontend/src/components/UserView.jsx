import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UserView = ({user, blogs}) => {
  if(!user) return (
    <div>
      no user with this id
    </div>
  );

  return (
    <div>
      <h3>{user.username}</h3>
      <h4>Added blogs: </h4>
      <li>
        {blogs.map(blog =>
          <ul key={blog._id}>
            {blog.title} by {blog.author}
          </ul>
        )}
      </li>
    </div>
  );
};

UserView.propTypes = ({
  user: PropTypes.instanceOf(Object),
  blogs: PropTypes.arrayOf(Object)
});

const mapStateToProps = (state, ownProps) => ({
  user: state.users.users.find(user => user.id === ownProps.id),
  blogs: state.blogs.filter(blog => blog.user && blog.user._id === ownProps.id)
});

export default connect(mapStateToProps)(UserView);