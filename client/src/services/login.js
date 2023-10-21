import axios from 'axios';
const baseUrl = '/api/v1/auth';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);

  // Tároljuk el az új tokeneket a localStorage-ban
  window.localStorage.setItem('refreshToken', response.data.refreshToken);

  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);

  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${baseUrl}/logout`);
  return response.data;
};

// Refresh Token
const refreshToken = async () => {
  const refreshTokenStored = window.localStorage.getItem('refreshToken');

  if (!refreshTokenStored) {
    throw new Error('No refresh token found');
  }
  console.log(document.cookie);
  await axios.post(
    `${baseUrl}/refresh-token`,
    {
      refreshToken: refreshTokenStored,
    },
    {
      withCredentials: true,
    }
  );
  console.log(document.cookie);
};

export default { login, register, logout, refreshToken };
