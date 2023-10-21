import { useEffect, useState } from 'react';
import blogService from '../services/blogs';

import Button from './Button';
import { useGlobalContext } from '../context/blogContext';
import io from 'socket.io-client';

const AddBlogForm = ({ blogFormRef }) => {
  const { setNotification, setBlogs, isLoading, setIsLoading } =
    useGlobalContext();
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const socket = io();

    socket.on('blogCreated', (data) => {
      if (data.newBlog) {
        setBlogs((prev) => prev.concat(data.newBlog));
        console.log(data);
      }
    });

    return () => {
      socket.close();
    };
  }, [setBlogs]);

  const addBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    setIsLoading(true);
    try {
      await blogService.createBlog(newBlog);

      setNotification({
        message: 'Blog successfully created!',
        type: 'success',
      });
    } catch (error) {
      console.error(error);
      setNotification({
        message: `Error: ${error.response.data.error}`,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
      setNewAuthor('');
      setNewTitle('');
      setNewUrl('');
      blogFormRef.current.toggleVisibility();
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };

  return (
    <div className="md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto m-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center capitalize text-2xl text-slate-500 my-3">
        create new blog
      </h2>
      <form onSubmit={addBlog}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-slate-700"
          >
            Title
          </label>
          <input
            type="text"
            value={newTitle}
            name="Title"
            id="title"
            onChange={({ target }) => setNewTitle(target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-slate-700"
          >
            Author
            <input
              type="text"
              value={newAuthor}
              name="Author"
              id="author"
              onChange={({ target }) => setNewAuthor(target.value)}
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="url"
            className="block text-sm font-medium text-slate-700"
          >
            URL
            <input
              type="text"
              value={newUrl}
              name="Url"
              id="url"
              onChange={({ target }) => setNewUrl(target.value)}
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
            />
          </label>
        </div>
        <div>
          <Button
            type="submit"
            className="my-3 bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none focus:border-slate-800 focus:ring focus:ring-slate-200"
          >
            {isLoading ? <div className="loading-sm" /> : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogForm;
