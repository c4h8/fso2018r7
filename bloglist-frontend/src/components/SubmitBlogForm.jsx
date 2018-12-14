import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postNotification as postNotificationAction } from '../actions/notificationActions';
import { postBlog as postBlogAction } from '../actions/blogActions';


class SubmitBlogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      title: '',
      author: '',
      url: '',
    });
  }

  handleFormChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    this.setState(prevstate => ({
      ...prevstate,
      [field]: value
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.postBlog(this.state);
  }

  render() {
    if (!this.props.user) return null;

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>create new</h3>
          <ul>
            <li>
              <label>title </label>
              <input name="title" type="text" value={this.state.title} onChange={this.handleFormChange} />
            </li>
            <li>
              <label>author </label>
              <input name="author" type="text" value={this.state.author} onChange={this.handleFormChange} />
            </li>
            <li>
              <label>url </label>
              <input name="url" type="text" value={this.state.url} onChange={this.handleFormChange} />
            </li>
            <li><input type="submit" value="create" /></li>
          </ul>
        </form>
      </div>
    );
  }
}

SubmitBlogForm.propTypes = ({
  concatBlog: PropTypes.func,
  postNotification: PropTypes.func,
  postBlog: PropTypes.func,
  user: PropTypes.instanceOf(Object)
});

const mapStateToProps = state => ({
  user: state.users.loggedInUser,
});

const mapDispatchToProps = dispatch => ({
  postNotification: (payload, lifetime, style) => dispatch(postNotificationAction(payload, lifetime, style)),
  postBlog: blog => dispatch(postBlogAction(blog))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitBlogForm);

