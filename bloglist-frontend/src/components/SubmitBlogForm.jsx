import React from 'react';
import PropTypes from 'prop-types';
import service from '../services/service';
import { connect } from 'react-redux';
import { parseError, errorStyle, infoStyle } from '../utils';
import { postNotification as postNotificationAction } from '../actions/notificationActions';


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

    service
      .submitBlog(this.state)
      .then(res => {
        const newBlog = res.data;
        this.props.concatBlog(newBlog);
        this.props.postNotification({
          message: `Added ${newBlog.name} by ${newBlog.author}`,
          style: infoStyle
        });
      })
      .catch(e => this.props.postNotification({
        message: parseError(e),
        style: errorStyle
      }));
  }

  render() {
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
});

const mapDispatchToProps = dispatch => ({
  postNotification: (payload, lifetime, style) => dispatch(postNotificationAction(payload, lifetime, style)),
});

export default connect(null, mapDispatchToProps)(SubmitBlogForm);

