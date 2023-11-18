import Blog from './Blog';

const BlogList = ({ blogs }) => {
  return (
    <ul className="max-w-6xl w-9/12 mx-auto p-4 grid gap-4 pt-24">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
