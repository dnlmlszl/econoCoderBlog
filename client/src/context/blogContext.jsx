import { createContext, useContext, useEffect, useState } from 'react';
import blogService from '../services/blogs';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getAll();
        setBlogs(fetchedBlogs);
      } catch (error) {
        setNotification({
          message: `Error: ${error.response.data.error}`,
          type: 'error',
        });
      }
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    setUser(null);
  };

  return (
    <BlogContext.Provider
      value={{
        user,
        setUser,
        blogs,
        setBlogs,
        notification,
        setNotification,
        handleLogout,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(BlogContext);
};
