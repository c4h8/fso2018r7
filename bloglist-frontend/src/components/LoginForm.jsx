import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postNotification as postNotificationAction } from '../actions/notificationActions';
import * as userActions from '../actions/userActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleFormChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      [field]: value
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.loginUser(this.state.username, this.state.password);
  }

  handleLogout = () => {
    this.props.logoutUser();

    this.setState({
      username: '',
      password: '',
    });
  }

  render() {
    if(this.props.user) return (
      <div>
        logged in as {`${this.props.user.name}`}
        <button onClick={ this.handleLogout }>logout</button>
      </div>
    );

    return (
      <div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <label>name </label>
              <input name="username" type="text" value={this.state.username} onChange={this.handleFormChange} />
            </li>
            <li>
              <label>password </label>
              <input name="password" type="password" value={this.state.password} onChange={this.handleFormChange} />
            </li>
            <li><input type="submit" value="login" /></li>
          </ul>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = ({
  user: PropTypes.instanceOf(Object),
  postNotification: PropTypes.func,
  loginUser: PropTypes.func,
  logoutUser: PropTypes.func,
});

const mapStateToProps = state => ({
  user: state.users.loggedInUser,
});

const mapDispatchToProps = dispatch => ({
  postNotification: (payload, lifetime, style) => dispatch(postNotificationAction(payload, lifetime, style)),
  loginUser: (username, password) => dispatch(userActions.loginUser(username, password)),
  logoutUser: () => dispatch(userActions.logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
