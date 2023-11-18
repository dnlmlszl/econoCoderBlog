import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  const { id, author, title } = blog;

  return (
    <section className="mb-4 p-6 bg-gray-300 bg-opacity-10 backdrop-blur-md shadow-lg rounded-md">
      <p className="text-dynamich3 text-gray-500 font-bold mb-2">{title} </p>
      <p className="text-gray-400 text-dynamicp italic mb-4">
        Written by: {author}
      </p>

      <Link
        to={`/blog/${id}`}
        className="inline-block text-gray-400 bg-gray-300 bg-opacity-10 backdrop-blur-md hover:bg-gray-500 focus:outline-none focus:border-gray-500 focus:ring focus:ring-gray-200 mt-4 px-4 py-2 rounded"
      >
        View details
      </Link>
    </section>
  );
};

export default Blog;
