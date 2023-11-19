import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/blogContext';
import userService from '../services/users';

const singleUserQuery = (id) => {
  return {
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/v1/users/${id}`);

      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    try {
      await queryClient.ensureQueryData(singleUserQuery(id));
    } catch (error) {
      if (error.response.status === 401) {
        return redirect('/');
      }
      console.error(error);
    }

    return { id };
  };

const SingleUser = () => {
  const { setNotification } = useGlobalContext();

  const navigate = useNavigate();
  const loaderData = useLoaderData();
  const { id } = loaderData;
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery(singleUserQuery(id));
  const queryClient = useQueryClient();

  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');

  if (isLoading) {
    return <div className="loading" />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleUpdateUser = async () => {
    try {
      await userService.updateUser(id, name, username);
      setNotification({
        message: 'User updated successfully',
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    } catch (error) {
      console.error(error);
      setNotification({ type: 'error', message: 'Error updating user' });
    } finally {
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(id);
      setNotification({
        message: 'User updated successfully',
        type: 'success',
      });
      navigate('/admin');
    } catch (error) {
      console.error(error);
      setNotification({ type: 'error', message: 'Error deleting user' });
    } finally {
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };

  return (
    <section className="container bg-white bg-opacity-10 backdrop-blur-md mt-24 mx-auto p-6">
      <h2 className="text-dynamich2 font-semibold mb-4 text-gray-300">
        User Details
      </h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-400 text-dynamic-small font-bold mb-2"
        >
          Name:{' '}
        </label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-400 text-dynamic-small font-bold mb-2"
        >
          Username:{' '}
        </label>
        <input
          type="text"
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleUpdateUser}
        >
          Update User
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleDeleteUser}
        >
          Delete User
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-300 mt-6 mb-4">
        User Blogs
      </h2>
      <div>
        {user?.blogs.map((blog) => (
          <div key={blog.id} className="mb-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-dynamich3 font-bold">{blog.title}</h3>
            <p className="text-gray-600">Author: {blog.author}</p>
            <p className="text-gray-600">Likes: {blog.likes}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SingleUser;
