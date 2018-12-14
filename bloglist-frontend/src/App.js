import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import BlogContainer from './components/BlogContainer';
import LoginForm from './components/LoginForm';
import service from './services/service';
import SubmitBlogForm from './components/SubmitBlogForm';
import NotificationContainer from './components/NotificationContainer';
import UsersContainer from './components/UsersContainer';
import UserView from './components/UserView';
import { postNotification as postNotificationAction } from './actions/notificationActions';
import { getBlogs as getBlogsAction } from './actions/blogActions';
import * as userActions from './actions/userActions';

const BlogView = () => (
  <div>
    <SubmitBlogForm />
    <BlogContainer />
  </div>
);

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
    this.props.getUsers();
  }

  render() {
    return (
      <Router>
        <div>
          <NotificationContainer />
          <LoginForm user={this.state.user} setUser={this.setUser} />

          <Route exact path="/" render={() => <BlogView />} />
          <Route exact path="/users" render={() => <UsersContainer />} />
          <Route path="/users/:id" render={({match}) => <UserView id={match.params.id}/>} />
        </div>
      </Router>
    );
  }
}

App.propTypes = ({
  postNotification: PropTypes.func,
  getBlogs: PropTypes.func,
  getUsers: PropTypes.func,
  setLoggedInUser: PropTypes.func,
  rblogs: PropTypes.arrayOf(Object)
});

const mapStateToProps = state => ({
  rblogs: state.blogs,
});

const mapDispatchToProps = dispatch => ({
  postNotification: (payload, lifetime, style) => dispatch(postNotificationAction(payload, lifetime, style)),
  setLoggedInUser: (user) => {
    dispatch(userActions.setLoggedInUser(user));
    service.setAuthHeader(user ? user.token : undefined);
  },
  getBlogs: () => dispatch(getBlogsAction()),
  getUsers: () => dispatch(userActions.getUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
