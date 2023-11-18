import { apiCall } from '../utils/apiCall'; // Feltételezve, hogy az apiCall a utils mappában található

const baseUrl = '/api/v1/blogs';

const getAll = async () => {
  try {
    const res = await apiCall('get', baseUrl);
    return res.blogs;
  } catch (error) {
    console.error('Error fetching the data ', error);
  }
};

const getBlog = async (id) => {
  return apiCall('get', `${baseUrl}/${id}`);
};

const createBlog = async (newObject) => {
  return apiCall('post', baseUrl, newObject);
};

const updateBlog = async (id, updatedObject) => {
  return apiCall('patch', `${baseUrl}/${id}`, updatedObject);
};

const deleteBlog = async (id) => {
  return apiCall('delete', `${baseUrl}/${id}`);
};

const createComment = async (blogId, commentContent) => {
  const commentData = {
    content: commentContent,
  };
  return apiCall('post', `${baseUrl}/${blogId}/comments`, commentData);
};

// const setToken = (newToken) => {
//   let user = JSON.parse(localStorage.getItem('loggedBlogappUser'));
//   if (user) {
//     user.token = newToken;
//     localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
//   }
// };

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
  getBlog,
};
