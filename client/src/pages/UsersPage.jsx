import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context/blogContext';
import userService from '../services/users';

import UserList from '../components/UserList';

const usersQuery = () => {
  return {
    queryKey: ['users'],
    queryFn: async () => {
      const data = await userService.getAllUsers();
      return data;
    },
  };
};

// export const loader = (queryClient) => {
//   async () => {
//     await queryClient.ensureQueryData(usersQuery());

//     return {};
//   };
// };

export const loader = (queryClient) => {
  async () => {
    await queryClient.prefetchQuery(usersQuery());

    return {};
  };
};

const UsersPage = () => {
  const { setNotification, user: blogUser, userLoading } = useGlobalContext();
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({ ...usersQuery(), enabled: !userLoading || !!blogUser });

  useEffect(() => {
    if (isError) {
      setNotification({ type: 'error', message: error.message });
      const timer = setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError, error, setNotification]);

  if (isLoading || userLoading) return <div className="loading" />;

  if (!blogUser || blogUser.role === 'visitor') {
    return <Navigate to="/" />;
  }

  return (
    <section className="mt-24 text-white">
      <article className="container mx-auto">
        <h1 className="text-dynamich2 font-medium mb-8 text-center">
          Users dashboard
        </h1>
        {users && blogUser.role === 'user' && (
          <UserList
            users={[users.find((user) => blogUser.name === user.name)]}
          />
        )}
        {users && blogUser.role === 'admin' && <UserList users={users} />}
      </article>
    </section>
  );
};

export default UsersPage;
