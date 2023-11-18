import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalContext } from '../context/blogContext';
import io from 'socket.io-client';
import blogService from '../services/blogs';

import Button from './Button';
import axios from 'axios';

const AddBlogForm = () => {
  const { setNotification, setBlogs } = useGlobalContext();
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const blogMutation = useMutation({
    mutationFn: (blog) => axios.post(`/api/v1/blogs`, blog),
  });

  queryClient.invalidateQueries('blogs');

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

    try {
      await blogMutation.mutateAsync(newBlog);
      navigate('/');
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
      setNewAuthor('');
      setNewTitle('');
      setNewUrl('');
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };

  if (blogMutation.isLoading) return <div className="loading" />;

  if (blogMutation.isError)
    return <p>`Error: ${blogMutation.error.message}`</p>;

  return (
    <div className="w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto m-8 p-6 bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg">
      <h2 className="text-center capitalize text-dynamich2 text-gray-300 my-3">
        create new blog
      </h2>
      <form onSubmit={addBlog}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-lg tracking-widest font-medium text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            value={newTitle}
            name="Title"
            id="title"
            onChange={({ target }) => setNewTitle(target.value)}
            className="mt-1 p-2 w-full text-yellow-600 border bg-white bg-opacity-10 backdrop-blur-md backdrop-filter rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-lg tracking-widest font-medium text-gray-300"
          >
            Author
            <input
              type="text"
              value={newAuthor}
              name="Author"
              id="author"
              onChange={({ target }) => setNewAuthor(target.value)}
              className="mt-1 p-2 w-full text-yellow-600 border bg-white bg-opacity-10 backdrop-blur-md backdrop-filter rounded-md shadow-sm"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="url"
            className="block text-lg tracking-widest font-medium text-gray-300"
          >
            URL
            <input
              type="text"
              value={newUrl}
              name="Url"
              id="url"
              onChange={({ target }) => setNewUrl(target.value)}
              className="mt-1 p-2 w-full text-yellow-600 border bg-white bg-opacity-10 backdrop-blur-md backdrop-filter rounded-md shadow-sm"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={blogMutation.isLoading}
            className="w-1/3 mt-3 p-2 bg-neutral-950 text-white rounded hover:bg-neutral-900 focus:outline-none focus:border-neutral-800 focus:ring focus:ring-slate-200"
          >
            {blogMutation.isLoading ? <div className="loading-sm" /> : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogForm;
