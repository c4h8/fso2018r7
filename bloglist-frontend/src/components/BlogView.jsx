import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as blogActions from '../actions/blogActions';

const BlogView = ({blog, likeBlog, deleteBlog, user, commentBlog}) => {
  if(!blog) return (
    <div>
      no blog with this id
    </div>
  );

  const deleteButton = (!blog.user || blog.user.username === (user && user.username))
    ?(
      <button className="btn btn-danger float-right" onClick={() => deleteBlog(blog._id)}>
        Delete
      </button>)
    : null;

  const messageRef = React.createRef();

  return (
    <div>
      <div className="jumbotron mb-5 py-4">
        <h3>{blog.title} by {blog.author}</h3>
        <p>{blog.url}</p>
        <p>added by {blog.user ? blog.user.username : 'anonymous'}</p>
        <div className="clearfix">
          likes: {blog.likes}
          <button className="btn btn-primary ml-3" onClick={() => likeBlog(blog._id)}>like</button>
          {deleteButton}
        </div>
      </div>
      <div>
        <h4 className="my-3">comments</h4>
        <ul className="list-unstyled ml-3">
          {blog.comments.map((comment, i) =>
            <li key={i} className="">{comment}</li>
          )}
        </ul>
      </div>
      <div>
        <form className="form-inline" onSubmit={commentBlog(blog._id, messageRef)}>
          <input className="form-control" name="message" placeholder="message" ref={messageRef}/>
          <input className="btn btn-secondary bg-white text-dark ml-3" type="submit" value="post comment" />
        </form>
      </div>
    </div>
  );
};

BlogView.propTypes = ({
  user: PropTypes.instanceOf(Object),
  blog: PropTypes.instanceOf(Object),
  likeBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  commentBlog: PropTypes.func,
});

const mapStateToProps = (state, ownProps) => ({
  user: state.users.loggedInUser,
  blog: state.blogs.find(blog => blog._id === ownProps.id)
});

const mapDispatchToProps = dispatch => ({
  likeBlog: id => dispatch(blogActions.postBlogLike(id)),
  deleteBlog: id => dispatch(blogActions.postDeleteBlog(id)),
  commentBlog: (id, ref) => (e) => {
    e.preventDefault();
    const message = ref.current.value;
    ref.current.value = '';
    dispatch(blogActions.postBlogComment(id, message));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogView);