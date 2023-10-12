const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => (blog.likes > max.likes ? blog : max);

  const favorite = blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0]);

  return favorite
    ? {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
      }
    : null;
};

module.exports = { favoriteBlog };
