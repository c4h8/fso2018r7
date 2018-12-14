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
      <div className="jumbotron py-3">
        <div className="col-sm-12">
          <form onSubmit={this.handleSubmit}>
            <h4 className="mb-4">create a new blog</h4>
            <div className="form-group row">
              <label className="col-sm-2">title</label>
              <div className="col-sm-10">
                <input className="form-control-sm" name="title" type="text" value={this.state.title} onChange={this.handleFormChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2">author</label>
              <div className="col-sm-10">
                <input className="form-control-sm" name="author" type="text" value={this.state.author} onChange={this.handleFormChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2">url</label>
              <div className="col-sm-10">
                <input className="form-control-sm" name="url" type="text" value={this.state.url} onChange={this.handleFormChange} />
              </div>  
            </div>
            <div className="col-sm-12">
              <input className="btn btn-primary" type="submit" value="create" />
            </div>
          </form>
        </div>
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

