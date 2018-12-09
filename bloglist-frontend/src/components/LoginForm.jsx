import React from 'react';
import service from '../services/service';
import PropTypes from 'prop-types';
import { parseError, errorStyle, infoStyle } from '../utils';

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

    service
      .login(this.state.username, this.state.password)
      .then(res => {
        const user = res.data ;
        
        this.props.setUser(user);
        window.localStorage.setItem('loggedInUser', JSON.stringify(user));

        this.props.postNotification({
          message: 'logged in',
          style: infoStyle
        });
      })
      .catch(e => this.props.postNotification({
        message: parseError(e),
        style: errorStyle
      }));
  }

  handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
    this.props.setUser(undefined);

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
  setUser: PropTypes.func,
  postNotification: PropTypes.func,
});

export default LoginForm;
