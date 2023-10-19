import axios from 'axios';

export const apiCall = async (method, url, data = null) => {
  let user = JSON.parse(localStorage.getItem('loggedBlogappUser'));
  let token = user ? user.token : null;
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // ...
    if (error.response && error.response.status === 401 && refreshToken) {
      try {
        const newTokenResponse = await axios.post(
          '/api/v1/auth/refresh-token',
          {
            refreshToken,
          }
        );

        // Frissítjük a token-t a localStorage-ban és a token változóban
        if (user) {
          user.token = newTokenResponse.data.accessToken;
          localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
          token = user.token; // Frissítjük a token változót is
        }

        // Újra próbáljuk meg az eredeti kérést az új token-nel
        const retryResponse = await axios({
          method,
          url,
          data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return retryResponse.data;
      } catch (refreshError) {
        console.error('Token frissítése sikertelen:', refreshError);
        throw new Error('Token refresh failed');
      }
    } else {
      console.error('Egyéb hiba:', error);
      throw error;
    }
  }
};
