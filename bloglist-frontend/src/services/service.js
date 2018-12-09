import axios from 'axios';

const baseUrl = '/api/blogs';



let authHeader = undefined;

const service = {
  setAuthHeader: newToken => authHeader = { headers: { 'Authorization': `bearer ${newToken}`, 'Content-Type': 'application/json'}},

  getBlogs: () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
  },

  submitBlog: blog =>
    axios.post('/api/blogs', blog, authHeader),

  likeBlog: blog => {
    const payload = ({
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    });

    return axios.put(`api/blogs/${blog._id}`, payload, authHeader);
  },

  deleteBlog: id => axios.delete(`api/blogs/${id}`, authHeader),

  login: (username, password) => axios.post('/api/login', ({ username, password })),
};

export default service;
