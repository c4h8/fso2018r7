import React from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import service from './services/service';
import SubmitBlogForm from './components/SubmitBlogForm';
import { parseError, errorStyle, infoStyle } from './utils';

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

  removeNotification = (id) => {
    this.setState(prevState => ({
      notifications: prevState.notifications.filter(n => n.id !== id)
    }));
  }

  postNotification = (n) => {
    // generate random id https://gist.github.com/6174/6062387
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    this.setState(prevState => ({ notifications: prevState.notifications.concat({...n, id})}));
    setTimeout(() => this.removeNotification(id), 2000);
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

        this.postNotification({
          message: `liked blog ${blog.title}`,
          style: infoStyle
        });
      })
      .catch(e => this.postNotification({
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
      .catch(e => this.postNotification({
        message: parseError(e),
        style: errorStyle
      }));
  }

  render() {
    const renderBlogs = [...this.state.blogs].sort((a, b) => b.likes- a.likes);

    return (
      <div>
        <div>
          {this.state.notifications.map(n =>
            <div key={n.id} style={n.style}>{n.message}</div>
          )}
        </div>
        <LoginForm user={this.state.user} setUser={this.setUser} postNotification={this.postNotification} />
        {this.state.user
          ? <SubmitBlogForm concatBlog={this.concatBlog} postNotification={this.postNotification} />
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

export default App;
