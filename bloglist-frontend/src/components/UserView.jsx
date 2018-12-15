import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UserView = ({user, blogs}) => {
  if(!user) return (
    <div>
      no user with this id
    </div>
  );

  const payload = (blogs && blogs.length !== 0) 
    ? blogs.map(blog =>
      <li className="list-group-item" key={blog._id}>
        {blog.title} by {blog.author}
      </li>)
    : <li className="list-group-item">no blogs added</li>;

  return (
    <div>
      <h3 className="mb-3">{user.username}</h3>
      <h4 className="mb-3">Added blogs: </h4>
      <ul className="list-group list-group-flush">
        {payload}
      </ul>
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