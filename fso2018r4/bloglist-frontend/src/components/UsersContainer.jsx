import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const UsersContainer = ({users}) => {
  if(!users) return null;

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs added</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

UsersContainer.propTypes = ({
  users: PropTypes.arrayOf(Object),
});

const mapStateToProps = state => ({
  users: state.users.users,
});

// const mapDispatchToProps = dispatch => ({
//   postNotification: (payload, lifetime, style) => dispatch(postNotificationAction(payload, lifetime, style)),
//   loginUser: (username, password) => dispatch(userActions.loginUser(username, password)),
//   logoutUser: () => dispatch(userActions.logoutUser())
// });

export default connect(mapStateToProps)(UsersContainer);
