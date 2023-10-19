import axios from 'axios';
const baseUrl = '/api/v1/auth';

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);

  // Tároljuk el az új tokeneket a localStorage-ban
  window.localStorage.setItem('refreshToken', response.data.refreshToken);
  window.localStorage.setItem(
    'loggedBlogappUser',
    JSON.stringify({
      token: response.data.token,
      username: response.data.username,
      name: response.data.name,
      email: response.data.email,
      id: response.data.id,
    })
  );

  return response.data;
};

const register = async (credentials) => {
  const response = await axios.post(`${baseUrl}/register`, credentials);

  return response.data;
};

// Refresh Token
const refreshToken = async () => {
  const refreshTokenStored = window.localStorage.getItem('refreshToken'); // Feltételezve, hogy a refresh token-t így tárolod
  if (!refreshTokenStored) {
    throw new Error('No refresh token found');
  }
  const response = await axios.post(`${baseUrl}/refresh-token`, {
    refreshToken: refreshTokenStored,
  });
  const newAccessToken = response.data.accessToken;

  const currentUser = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  );

  const updatedUser = { ...currentUser, token: newAccessToken };

  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(updatedUser));

  return newAccessToken;
};

export default { login, register, refreshToken };
