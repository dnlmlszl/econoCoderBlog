import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/blogContext';
import loginService from '../services/login';

import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const LoginForm = () => {
  const { setUser, setNotification, setIsLoggedIn } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ email, password });

      // Refresh token
      window.localStorage.setItem('refreshToken', user.refreshToken);

      setUser(user);
      queryClient.invalidateQueries('users');
      setIsLoggedIn(true);
      navigate('/');
      setNotification({
        message: `User ${user.username} login success`,
        type: 'success',
      });
    } catch (error) {
      setNotification({ message: 'Wrong credentials', type: 'error' });
    }
    setEmail('');
    setPassword('');
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };
  return (
    <article className="max-w-md mx-auto m-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center capitalize text-dynamich2 text-neutral-950 my-3">
        login
      </h2>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="Username"
            className="block text-gray-700 text-sm text-start font-bold mb-2"
          >
            Email:
            <input
              type="text"
              value={email}
              name="Username"
              id="Username"
              required
              onChange={({ target }) => setEmail(target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-gray-700 text-sm text-start font-bold mb-2"
          >
            Password:
            <input
              type="password"
              value={password}
              name="Password"
              id="Password"
              required
              onChange={({ target }) => setPassword(target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </label>
        </div>
        <div>
          <Button
            type="submit"
            id="login-button"
            className="w-full mt-3 p-2 bg-neutral-950 text-white rounded hover:bg-neutral-900 focus:outline-none focus:border-neutral-800 focus:ring focus:ring-slate-200"
          >
            login
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Not a member yet?
          <Link to="/register" className="text-gray-500 hover:text-gray-600">
            {' '}
            Register!
          </Link>
        </p>
      </form>
    </article>
  );
};

export default LoginForm;
