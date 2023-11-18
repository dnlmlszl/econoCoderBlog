import { createContext, useContext, useEffect, useState } from 'react';
import blogService from '../services/blogs';
import loginService from '../services/login';
import axios from 'axios';

axios.defaults.withCredentials = true;

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const fetchedBlogs = await blogService.getAll();
        if (fetchedBlogs) {
          setBlogs(fetchedBlogs);
        } else {
          console.error('Error: fetchedBlogs is not an array');
        }
      } catch (error) {
        setNotification({
          message: `Error: ${error.response.data.error}`,
          type: 'error',
        });
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setNotification({ message: null, type: null });
        }, 5000);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setUserLoading(true);
        const response = await axios.get('/api/v1/users/me', {
          withCredentials: true,
        });
        setUser(response.data);
        setUserLoading(false);
      } catch (error) {
        setUserLoading(false);
        if (error.response && error.response.status === 401) {
          try {
            await loginService.refreshToken();
            fetchUserData();
          } catch (refreshError) {
            console.error('Error fetching user data: ', error);
          }
        } else {
          console.error('Error fetching user data: ', error);
        }
      } finally {
        setUserLoading(false);
      }
    };
    const refreshTokenStored = window.localStorage.getItem('refreshToken');
    if (refreshTokenStored) {
      fetchUserData();
    } else {
      setUserLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    window.localStorage.removeItem('refreshToken');

    await loginService.logout();

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
        userLoading,
        isLoggedIn,
        setIsLoggedIn,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(BlogContext);
};
