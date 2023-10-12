const _ = require('lodash');

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author');
  const maxBlogsAuthor = _.maxBy(_.keys(authors), (author) => authors[author]);

  return {
    author: maxBlogsAuthor,
    blogs: authors[maxBlogsAuthor],
  };
};

module.exports = { mostBlogs };
