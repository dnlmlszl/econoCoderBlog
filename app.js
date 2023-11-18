require('dotenv').config();
const path = require('path');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const tokenExtractor = require('./middleware/tokenExtractor');
const blogRouter = require('./routes/blogRouter');
const commentRouter = require('./routes/commentRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const errorHandlingMiddleware = require('./middleware/errorHandler');
const middleware = require('./utils/middlewares');

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(cookieParser());
app.use(middleware.requestLogger);

app.use(tokenExtractor);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/v1/testing', testingRouter);
}

app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(errorHandlingMiddleware);

module.exports = app;
