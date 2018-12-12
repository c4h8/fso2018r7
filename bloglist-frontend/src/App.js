import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import service from './services/service';
import SubmitBlogForm from './components/SubmitBlogForm';
import NotificationContainer from './components/NotificationContainer';
import { parseError, errorStyle, infoStyle } from './utils';
import { postNotification as postNotificationAction } from './actions/notificationActions';

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
      this.setState({user});
      service.setAuthHeader(user.token);
    } catch(e) {
      window.alert(e);
    }

    service.getBlogs().then(blogs => this.setState({ blogs }));
  }

  setUser = (user) => {
    this.setState({ user });
    service.setAuthHeader(user ? user.token : undefined);
  }

  toggleBlog = (id) => {
    const newBlogs = this.state.blogs.map(blog => blog._id === id
      ? {...blog, expanded: !blog.expanded}
      : blog  
    );

    this.setState({ blogs: newBlogs });
  }

  likeBlog = (blog) => {
    service.likeBlog(blog)
      .then(() => {
        const newBlogs = this.state.blogs.map(b => b._id === blog._id
          ? {...b, likes: b.likes + 1}
          : b  
        );
    
        this.setState({ blogs: newBlogs });

        this.props.postNotification({
          message: `liked blog ${blog.title}`,
          style: infoStyle
        });
      })
      .catch(e => this.props.postNotification({
        message: parseError(e),
        style: errorStyle
      }));
  }

  concatBlog = (blog) => this.setState(prevState => ({ blogs: prevState.blogs.concat(blog)}));

  deleteBlog = (id) => {
    service.deleteBlog(id)
      .then(() =>
        this.setState(prevState => ({ blogs: prevState.blogs.filter(b => b._id !== id)}))
      )
      .catch(e => this.props.postNotification({
        message: parseError(e),
        style: errorStyle
      }));
  }

  render() {
    const renderBlogs = [...this.state.blogs].sort((a, b) => b.likes- a.likes);

    return (
      <div>
        <NotificationContainer />
        <LoginForm user={this.state.user} setUser={this.setUser} />
        {this.state.user
          ? <SubmitBlogForm concatBlog={this.concatBlog} />
          : null
        }
        {this.state.user
          ? renderBlogs.map(blog => 
            <Blog
              key={blog._id}
              blog={blog}
              toggleBlog={this.toggleBlog}
              likeBlog={this.likeBlog}
              deleteBlog={this.deleteBlog}
              username={this.state.user && this.state.user.username}
            />)
          : null
        }
      </div>
    );
  }
}

App.propTypes = ({
  postNotification: PropTypes.func
});

const mapDispatchToProps = dispatch => ({
  postNotification: (payload, lifetime, style) => dispatch(postNotificationAction(payload, lifetime, style)),
});

export default connect(null, mapDispatchToProps)(App);
