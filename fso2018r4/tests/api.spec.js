const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { app, server } = require('../index');
const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const { blogsInDb, testBlogs, usersInDb, generateAuthHeader } = require('./testHelper');

// const loginUser = async (username, password) => {
//   const res = await api
//     .post('/api/login')
//     .send({ username, password });

//   return res;
// };

const rootUserData = ({
  adult: true,
  username: 'root',
  name: 'root',
  passwordHash: '$2a$10$2CJiEKW5bl433Tg3QsNLXe6CXvQuKnAuahNHJJBd4on9UECE4QwSa',
});

let rootToken = undefined;

beforeAll(async () => {
  await Blog.remove({});
  await User.remove({});

  const rootUser = new User(rootUserData);

  await rootUser.save();

  const rootUserInDb = await User.findOne({ username: 'root' });

  rootToken = generateAuthHeader(jwt.sign(
    {
      username: rootUserInDb.username,
      id: rootUserInDb._id
    },
    process.env.SECRET
  ));

  const testBlogPromises = testBlogs
    .map(blog => new Blog(blog))
    .map(blog => blog.save());

  await Promise.all(testBlogPromises);
});


describe('api tests', () => {
  describe('api/blogs GET', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('there are two blogs', async () => {
      const blogsBefore = await blogsInDb();
      const res = await api
        .get('/api/blogs');

      expect(res.body.length).toBe(blogsBefore.length);
    });
  });


  describe('api/blogs POST', () => {
    test('correctly formatted blog is saved to the db', async () => {
      const newBlog = ({
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 4,
      });

      const blogsBefore = await blogsInDb();

      await api
        .post('/api/blogs')
        .set('Authorization', rootToken)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAfter = await blogsInDb();

      expect(blogsAfter.length).toBe(blogsBefore.length + 1);
      expect(blogsAfter).toContainEqual(newBlog);
    });


    test('posting a blog missing likes attribute is defaulted to zero likes', async () => {
      const res = await api
        .post('/api/blogs')
        .set('Authorization', rootToken)
        .send({
          title: 'cool blog',
          author: 'blg writer man',
          url: 'http://blog.blog.com',
        });

      expect(res.body.likes).toBe(0);
    });

    test('submitting a blog without name or ulr returns 400 status', async () => {
      await api
        .post('/api/blogs')
        .set('Authorization', rootToken)
        .send({
          author: 'blg writer man',
          likes: '3'
        })
        .expect(400);
    });

    test('correctly formatted blog cant be submitted without a token', async () => {
      const blogsBefore = await blogsInDb();

      await api
        .post('/api/blogs')
        .send({
          title: 'TDD harms architecture2',
          author: 'Robert C. Martin2',
          url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html2',
          likes: 4,
        })
        .expect(400);

      const blogsAfter = await blogsInDb();

      expect(blogsAfter.length).toBe(blogsBefore.length);
    });
  });

  describe('api/blogs DELETE', () => {
    test('deleting a blog by id as it deletes the blog', async () => {
      const newBlog = ({
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 4,
      });

      await Blog.remove({});

      await api
        .post('/api/blogs')
        .set('Authorization', rootToken)
        .send(newBlog);

      const blogs = await Blog.find({});

      await api
        .delete(`/api/blogs/${blogs[0]._id}`)
        .set('Authorization', rootToken)
        .expect(204);

      const blogsAfter = await blogsInDb();

      expect(blogs.length).toBe(blogsAfter.length + 1);
      expect(blogsAfter).not.toContainEqual(newBlog);
    });

    test('should return 400 when using an invalid id', async () => {
      await api
        .delete('/api/blogs/aTotallyFakeId')
        .set('Authorization', rootToken)
        .expect(400);
    });
  });

  describe('api/blogs PUT', () => {
    test('posting new blog to api/blogs/id wit PUT updates the existing blog', async () => {
      const newBlog = ({
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 4,
      });

      const updatedBlog = ({
        title: 'title',
        author: 'robby c',
        url: 'blog.com',
        likes: 23,
      });

      await Blog.remove({});

      await api
        .post('/api/blogs')
        .set('Authorization', rootToken)
        .send(newBlog);

      const blogs = await Blog.find({});

      await api
        .put(`/api/blogs/${blogs[0]._id}`)
        .send(updatedBlog)
        .expect(204);

      const blogsAfter = await blogsInDb();

      expect(blogs.length).toBe(blogsAfter.length);
      expect(blogsAfter).not.toContainEqual(newBlog);
      expect(blogsAfter).toContainEqual(updatedBlog);
    });
  });
});


describe('user api tests', () => {
  describe('api/users GET', () => {
    test('return a list of users as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('api/users POST', () => {
    test('should create a new user when valid data is sent', async () => {
      const newUser = ({
        username: 'gmguy',
        name: 'Guy Man',
        password: 'sekred',
        adult: true
      });

      const usersBefore = await usersInDb();

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAfter = await usersInDb();

      expect(usersAfter.length).toBe(usersBefore.length + 1);
    });

    test('should reject creating a user with password shorter than 3 charactes', async () => {
      const newUser = ({
        username: 'iHatePasswords',
        name: 'P. W. Hatington',
        password: 'pw',
        adult: true
      });

      const usersBefore = await usersInDb();

      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(400);

      const usersAfter = await usersInDb();

      expect(usersAfter.length).toBe(usersBefore.length);
      expect(res.body.error).toBe('password must be over 2 characters');
    });
  });
});


describe('login api tests', () => {
  const rootUser = ({
    username: 'rootUser',
    name: 'root',
    password: 'rootPw',
  });

  beforeAll(async () => {
    await Blog.remove({});
    await User.remove({});

    await api
      .post('/api/users')
      .send(rootUser);
  });

  describe('api/login POST', () => {
    test('should return a token when using valid pw and name for an existing user', async () => {
      await api
        .post('/api/login')
        .send({ username: rootUser.username, password: rootUser.password })
        .expect(200);
    });

    test('should return 400 with invalid password', async () => {
      await api
        .post('/api/login')
        .send({ username: rootUser.username, password: 'wrong password' })
        .expect(401);
    });
  });
});

afterAll(() => server.close());
