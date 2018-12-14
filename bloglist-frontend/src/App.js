import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BlogContainer from './components/BlogContainer';
import LoginForm from './components/LoginForm';
import service from './services/service';
import SubmitBlogForm from './components/SubmitBlogForm';
import NotificationContainer from './components/NotificationContainer';
import { postNotification as postNotificationAction } from './actions/notificationActions';
import { getBlogs as getBlogsAction } from './actions/blogActions';
import { setLoggedInUser as setLoggedInUserAction } from './actions/userActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      blogs: [],
      notifications: []
    };
  }

  componentDidMount() {
    try {
      const user = JSON.parse(window.localStorage.getItem('loggedInUser'));
      this.props.setLoggedInUser(user);
    } catch(e) {
      window.alert(e);
    }

    this.props.getBlogs();
  }

  setUser = (user) => {
    this.setState({ user });
    service.setAuthHeader(user ? user.token : undefined);
  }

  render() {
    return (
      <div>
        <NotificationContainer />
        <LoginForm user={this.state.user} setUser={this.setUser} />

        <SubmitBlogForm />

        <BlogContainer />
      </div>
    );
  }
}

App.propTypes = ({
  postNotification: PropTypes.func,
  getBlogs: PropTypes.func,
  setLoggedInUser: PropTypes.func,
  rblogs: PropTypes.arrayOf(Object)
});

const mapStateToProps = state => ({
  rblogs: state.blogs,
});

const mapDispatchToProps = dispatch => ({
  postNotification: (payload, lifetime, style) => dispatch(postNotificationAction(payload, lifetime, style)),
  setLoggedInUser: (user) => {
    dispatch(setLoggedInUserAction(user));
    service.setAuthHeader(user ? user.token : undefined);
  },
  getBlogs: () => dispatch(getBlogsAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
