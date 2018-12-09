/* eslint-disable no-unused-vars */

const blogs = [
  {
    likes: 5,
    _id: '5bf308d3eeae65359cac828c',
    title: 'react is pretty cool',
    author: 'me',
    url: 'blogs.cz',
    user: {
      username: 'lol',
      name: 'lol'
    }
  },
  {
    likes: 6,
    _id: '5bf9bc87343d261ef8fda730',
    title: 'ROOT BLOGS',
    author: 'rooty mc tooty',
    url: 'https',
    user: {
      username: 'root',
      name: 'root'
    }
  },
  {
    likes: 0,
    _id: '5bf9bcb4343d261ef8fda731',
    title: 'fasenhei heyo',
    author: 'mark tsukerperk',
    url: 'asd',
    user: {
      username: 'root',
      name: 'root'
    }
  }
];

const baseUrl = '/api/blogs';

let authHeader = undefined;

const service = ({
  setAuthHeader: newToken => authHeader = { headers: { 'Authorization': `bearer ${newToken}`, 'Content-Type': 'application/json'}},

  getBlogs: jest.fn().mockImplementation(() => Promise.resolve(blogs)),

  submitBlog: blog => null,

  likeBlog: blog => {
    // const payload = ({
    //   user: blog.user._id,
    //   likes: blog.likes + 1,
    //   author: blog.author,
    //   title: blog.title,
    //   url: blog.url
    // });

    return null;
  },

  deleteBlog: id => null,

  login: (username, password) => null,
});

export default service;
