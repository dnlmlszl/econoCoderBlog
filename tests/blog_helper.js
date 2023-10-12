const Blog = require('../models/Blog');
const supertest = require('supertest');
const app = require('../app'); // Az express appod helye
const api = supertest(app);

const initialBlogs = [
  {
    author: 'LMD',
    title: 'Test title 1',
    url: 'https://www.123456.com',
    likes: 5,
  },
  {
    author: 'Sanyi',
    title: 'Test title 2',
    url: 'https://www.321456.com',
    likes: 3,
  },
  {
    author: 'LMD',
    title: 'Test title 3',
    url: 'https://www.123456.com',
    likes: 5,
  },
  {
    author: 'Sanyi',
    title: 'Test title 4',
    url: 'https://www.321456.com',
    likes: 3,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

let token;

const loginUser = async () => {
  const userCredentials = {
    username: 'yourTestUser',
    password: 'yourTestPassword',
  };

  const result = await api.post('/api/v1/auth/login').send(userCredentials);
  token = result.body.token;
};

const getToken = () => {
  if (!token) {
    throw new Error('Token is not set. Did you forget to login?');
  }
  return token;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  loginUser,
  getToken,
};
