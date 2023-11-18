import axios from 'axios';

const baseUrl = '/api/v1/users';

const getAllUsers = async () => {
  try {
    const res = await axios.get(baseUrl);

    return res.data;
  } catch (error) {
    console.error('Error fetching the data ', error);
  }
};

const fetchUser = async () => {
  const response = await axios.get(`${baseUrl}/me`, { withCredentials: true });

  return response.data;
};

export default { getAllUsers, fetchUser };
