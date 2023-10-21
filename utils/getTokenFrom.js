const getTokenFrom = (req) => {
  if (!req.cookies) return null;

  const tokenFromCookie = req.cookies.accessToken;
  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }

  return null;
};

module.exports = { getTokenFrom };
