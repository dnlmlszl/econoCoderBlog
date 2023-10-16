import axios from 'axios';
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

export default { getAll, createBlog, updateBlog, deleteBlog, setToken };
