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

export default { getAllUsers };
