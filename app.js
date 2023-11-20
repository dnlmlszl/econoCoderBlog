require('dotenv').config();
const path = require('path');
const express = require('express');
require('express-async-errors');
const app = express();
const cookieParser = require('cookie-parser');
// SECURITY
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
// ROUTES
const blogRouter = require('./routes/blogRouter');
const commentRouter = require('./routes/commentRouter');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
// MIDDLEWARE
const tokenExtractor = require('./middleware/tokenExtractor');
const errorHandlingMiddleware = require('./middleware/errorHandler');
const middleware = require('./utils/middlewares');

app.use(
  rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 100,
  })
);

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser());

app.use(express.static('dist'));

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
