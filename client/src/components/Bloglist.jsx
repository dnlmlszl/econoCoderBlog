import Blog from './Blog';
import { useGlobalContext } from '../context/blogContext';

const BlogList = () => {
  const { blogs, isLoading } = useGlobalContext();

  if (isLoading) return <div className="loading" />;
  return (
    <ul className="max-w-6xl w-9/12 mx-auto p-4 grid xl:grid-cols-2 gap-4">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export default BlogList;
