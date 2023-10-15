import { useGlobalContext } from '../context/blogContext';
import loginService from '../services/login';
import blogService from '../services/blogs';

import Button from './Button';
import { useState } from 'react';

const LoginForm = () => {
  const { setUser, setNotification } = useGlobalContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setNotification({
        message: `User ${user.username} login success`,
        type: 'success',
      });
    } catch (error) {
      setNotification({ message: 'Wrong credentials', type: 'error' });
    }
    setUsername('');
    setPassword('');
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };
  return (
    <div className="max-w-md w-2/4 mx-auto m-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center capitalize text-2xl text-slate-500 my-3">
        login
      </h2>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-slate-700"
          >
            Username:
            <input
              type="text"
              value={username}
              name="Username"
              id="username"
              required
              onChange={({ target }) => setUsername(target.value)}
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Password:
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              required
              onChange={({ target }) => setPassword(target.value)}
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
            />
          </label>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full mt-3 p-2 bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none focus:border-slate-800 focus:ring focus:ring-slate-200"
          >
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
