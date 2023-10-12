const _ = require('lodash');

const mostLikes = (blogs) => {
  const authorLikes = _(blogs)
    .groupBy('author')
    .map((userBlogs, author) => ({
      author,
      likes: _.sumBy(userBlogs, 'likes'),
    }))
    .value();

  const mostLikedAuthor = _.maxBy(authorLikes, 'likes');

  return mostLikedAuthor;
};

module.exports = { mostLikes };
