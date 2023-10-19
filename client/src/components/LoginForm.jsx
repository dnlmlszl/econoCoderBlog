import { useState } from 'react';
import { useGlobalContext } from '../context/blogContext';
import loginService from '../services/login';
import blogService from '../services/blogs';

import Button from './Button';

const LoginForm = () => {
  const { setUser, setNotification } = useGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ email, password });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      // Refresh token
      window.localStorage.setItem('refreshToken', user.refreshToken);

      blogService.setToken(user.token);
      setUser(user);
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
    <article className="max-w-md w-2/4 mx-auto m-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-center capitalize text-2xl text-slate-500 my-3">
        login
      </h2>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            htmlFor="Username"
            className="block text-sm font-medium text-slate-700"
          >
            Email:
            <input
              type="text"
              value={email}
              name="Username"
              id="Username"
              required
              onChange={({ target }) => setEmail(target.value)}
              className="mt-1 p-2 w-full border rounded-md shadow-sm"
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-slate-700"
          >
            Password:
            <input
              type="password"
              value={password}
              name="Password"
              id="Password"
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
    </article>
  );
};

export default LoginForm;
