import axios from 'axios';
import loginService from './login';
const baseUrl = '/api/v1/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data.blogs;
  } catch (error) {
    console.error('Error fetching the data ', error);
  }
};

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.post(baseUrl, newObject, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error creating a blog: ', error);
    throw error;
  }
};

const updateBlog = async (id, updatedObject) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.patch(
      `${baseUrl}/${id}`,
      updatedObject,
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error when updating the blog: ', error);
    throw error;
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error when deleting the blog: ', error);
    throw error;
  }
};

// Refresh Token
const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await loginService.refreshToken();
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default { getAll, createBlog, updateBlog, deleteBlog, setToken };
