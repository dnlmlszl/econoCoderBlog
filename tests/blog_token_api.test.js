require('dotenv').config();
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const helper = require('./blog_helper');
const api = supertest(app);
const Blog = require('../models/Blog');

let token;

beforeAll(async () => {
  // Kapcsolódás az adatbázishoz
  await mongoose.connect(process.env.TEST_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 10000);

beforeEach(async () => {
  await Blog.deleteMany({});
  await helper.loginUser();
}, 10000);

// BEGINN TESTS

test('blogs are returned as json and have correct length', async () => {
  const response = await api
    .get('/api/v1/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body.blogs).toHaveLength(helper.initialBlogs.length);
  expect(response.body.count).toBe(helper.initialBlogs.length);
}, 10000);

test('blogs are returned as json and id property is defined', async () => {
  const response = await api
    .get('/api/v1/blogs')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  response.body.blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
}, 10000);

test('making an HTTP POST request creates a new blog', async () => {
  const newBlog = {
    author: 'Sanyi',
    title: 'Test title 4',
    url: 'https://www.321456.com',
    likes: 3,
    user: 'someUserId',
  };

  await api
    .post('/api/v1/blogs')
    .set('Authorization', `Bearer ${helper.getToken()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((n) => n.title);

  expect(titles).toContain('Test title 4');
}, 10000);

test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://testurl.com',
  };

  const response = await api
    .post('/api/v1/blogs')
    .set('Authorization', `Bearer ${helper.getToken()}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toBeDefined();
  expect(response.body.likes).toBe(0);
});

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
  };

  await api
    .post('/api/v1/blogs')
    .set('Authorization', `Bearer ${helper.getToken()}`)
    .send(newBlog)
    .expect(400);
});

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 5,
  };

  await api
    .post('/api/v1/blogs')
    .set('Authorization', `Bearer ${helper.getToken()}`)
    .send(newBlog)
    .expect(400);
});

test('blog can be deleted', async () => {
  const newBlog = new Blog({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
  });

  await newBlog.save();

  const initialBlogs = await helper.blogsInDb();
  expect(initialBlogs).toHaveLength(helper.initialBlogs.length + 1);

  await api
    .delete(`/api/v1/blogs/${newBlog.id}`)
    .set('Authorization', `Bearer ${helper.getToken()}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  const newLikes = blogToUpdate.likes + 1;

  const updatedBlog = await api
    .patch(`/api/v1/blogs/${blogToUpdate.id}`)
    .set('Authorization', `Bearer ${helper.getToken()}`)
    .send({ likes: newLikes })
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(updatedBlog.body.likes).toBe(newLikes);

  const blogsAtEnd = await helper.blogsInDb();
  const likes = blogsAtEnd.map((b) => b.likes);

  expect(likes).toContain(newLikes);
});

// END OF TEST

afterAll(async () => {
  await mongoose.connection.close();
});
