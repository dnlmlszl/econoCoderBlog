import { useState } from 'react';
import loginService from '../services/login';
import { useGlobalContext } from '../context/blogContext';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const RegisterForm = () => {
  const { setUser, setNotification } = useGlobalContext();
  const [credentials, setCredentials] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
  });
  const queryClient = useQueryClient();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.register(credentials);

      window.localStorage.setItem('refreshToken', user.refreshToken);
      setUser(user);
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setNotification({
        message: `User ${user.username} register success, user logged in`,
        type: 'success',
      });
    } catch (error) {
      console.error('Registration failed: ', error);
    } finally {
      setCredentials({ username: '', name: '', email: '', password: '' });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };

  return (
    <article className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center capitalize text-dynamich2 text-neutral-950 mb-6">
        register
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm text-start font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm text-start font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            id="name"
            type="text"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm text-start font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            id="email"
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm text-start font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="w-full mt-3 p-2 bg-neutral-950 text-white rounded hover:bg-neutral-900 focus:outline-none focus:border-neutral-800 focus:ring focus:ring-slate-200"
            type="submit"
          >
            Register user
          </button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already a member?
          <Link to="/login" className="text-gray-500 hover:text-gray-600">
            {' '}
            Login!
          </Link>
        </p>
      </form>
    </article>
  );
};

export default RegisterForm;
