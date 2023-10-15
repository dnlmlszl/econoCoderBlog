import { useState } from 'react';
import Button from './Button';

const Blog = ({ title, author, url, likes }) => {
  const [openBlog, setOpenBlog] = useState(false);
  return (
    <section className="mb-4 p-6 bg-white shadow-lg rounded-md">
      <p className="text-xl font-bold mb-2">Title: {title} </p>
      <p className="text-slate-700 italic mb-4">Written by: {author}</p>
      {openBlog && (
        <>
          <p className="mb-2">{url}</p>
          <p className="mb-4">{likes}</p>
        </>
      )}
      <Button
        className="text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200"
        onClick={() => setOpenBlog((op) => !op)}
      >
        {openBlog ? 'Close' : 'View details'}
      </Button>
    </section>
  );
};

export default Blog;
