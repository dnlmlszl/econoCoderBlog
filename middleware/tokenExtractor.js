const { getTokenFrom } = require('../utils/getTokenFrom');

const tokenExtractor = (req, res, next) => {
  req.token = getTokenFrom(req);

  next();
};

module.exports = tokenExtractor;
