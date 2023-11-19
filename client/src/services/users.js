import axios from 'axios';

const baseUrl = '/api/v1/users';

const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl);

    return response.data;
  } catch (error) {
    console.error('Error fetching the data ', error);
  }
};

const fetchUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/me`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching the data ', error);
  }
};

const updateUser = async (id, name, username) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, { name, username });
    return response.data;
  } catch (error) {
    console.error('Error updating the data ', error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error updating the data ', error);
  }
};

export default { getAllUsers, fetchUser, updateUser, deleteUser };
