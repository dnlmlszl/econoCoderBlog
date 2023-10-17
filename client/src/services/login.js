import axios from 'axios';
const baseUrl = '/api/v1/auth';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

// Refresh Token
const refreshToken = async () => {
  const refreshToken = window.localStorage.getItem('refreshToken'); // Feltételezve, hogy a refresh token-t így tárolod
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }
  const response = await axios.post(`${baseUrl}/refresh-token`, {
    refreshToken,
  });
  const newAccessToken = response.data.accessToken;

  const currentUser = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  );

  const updatedUser = { ...currentUser, token: newAccessToken };

  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(updatedUser));

  return newAccessToken;
};

export default { login, refreshToken };
