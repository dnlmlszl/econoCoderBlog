const getTokenFrom = (req) => {
  // const authorization = req.get('authorization');
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }

  return null;
};

module.exports = { getTokenFrom };
