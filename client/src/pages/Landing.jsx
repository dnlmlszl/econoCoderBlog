import blogService from '../services/blogs';
import BlogList from '../components/BlogList';
import SkeletonBlog from '../components/SkeletonBlog';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useGlobalContext } from '../context/blogContext';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const blogListQuery = () => {
  return {
    queryKey: ['blogs'],
    queryFn: async () => {
      const data = await blogService.getAll();

      return data;
    },
  };
};

// export const loader = (queryClient) => {
//   async () => {
//     await queryClient.ensureQueryData(blogListQuery());
//     return {};
//   };
// };

export const loader = (queryClient) => {
  return async () => {
    await queryClient.prefetchQuery(blogListQuery());
    return {};
  };
};

const Landing = () => {
  const { setNotification } = useGlobalContext();
  const { data: blogs, isLoading, isError, error } = useQuery(blogListQuery());
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io();

    socket.on('blogCreated', () => {
      queryClient.invalidateQueries('blogs');
    });

    return () => {
      socket.close();
    };
  }, [queryClient]);

  if (isLoading) return <SkeletonBlog />;

  if (isError) {
    setNotification({ type: 'error', message: error.message });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  }

  return <BlogList blogs={blogs} />;
};

export default Landing;
