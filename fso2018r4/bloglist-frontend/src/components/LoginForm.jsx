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
      <div className="col-sm-12 clearfix my-4">
        <span className="float-right">
          logged in as {`${this.props.user.name}`}
          <button className="btn btn-secondary btn-sm ml-3" onClick={ this.handleLogout }>logout</button>
        </span>
      </div>
    );

    return (
      <div>
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="form-row my-4">
            <div className="col-sm-5">
              <input className="form-control" name="username" placeholder="username" type="text" value={this.state.username} onChange={this.handleFormChange} />
            </div>
            <div className="col-sm-5">
              <input className="form-control" name="password" placeholder="password" type="password" value={this.state.password} onChange={this.handleFormChange} />
            </div>
            <div className="col-sm-2 d-flex flex-row justify-content-center">
              <input className="btn btn-success" type="submit" value="login" />
            </div>
          </div>
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
