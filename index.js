require('dotenv').config();
const app = require('./app');
const connectDB = require('./db/connect');
const http = require('http');
const { init } = require('./utils/socket');
const { getTokenFrom } = require('./utils/getTokenFrom');
const Blog = require('./models/Blog');

const server = http.createServer(app);
const io = init(server);

io.use((socket, next) => {
  socket.token = getTokenFrom(socket.request);
  next();
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Eseménykezelő a frontendről érkező likeolás eseményhez
  socket.on('likeBlog', async (data) => {
    const { blogId, userId } = data;
    const blog = await Blog.findById(blogId);
    if (blog && !blog.likedBy.includes(userId)) {
      blog.likes += 1;
      blog.likedBy.push(userId);
      await blog.save();
      console.log(data);

      // Küldj eseményt a frontendnek a likeolásról
      io.emit('blogLiked', { blogId: blogId, likes: blog.likes });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
