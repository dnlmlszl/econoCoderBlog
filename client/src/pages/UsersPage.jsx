import { useQuery, useQueryClient } from '@tanstack/react-query';
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

export const loader = (queryClient) => {
  return async () => {
    await queryClient.prefetchQuery(usersQuery());

    return {};
  };
};

const UsersPage = () => {
  const { setNotification, user: loggedInUser } = useGlobalContext();
  const { data: users, isLoading, isError, error } = useQuery(userQuery());

  if (isError) {
    setNotification({ type: 'error', message: error.message });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  }

  if (isLoading) return <div className="loading" />;

  if (!loggedInUser || loggedInUser.role === 'visitor') {
    return <Navigate to="/" />;
  }

  return (
    <section className="mt-24 text-white">
      <article className="container mx-auto">
        <h1 className="text-dynamich2 font-medium mb-8 text-center">
          Users dashboard
        </h1>
        {/* {users && blogUser.role === 'user' && (
          <UserList
            users={[users.find((user) => blogUser.name === user.name)]}
          />
        )}
        {users && blogUser.role === 'admin' && <UserList users={users} />} */}
        {<UserList users={users} isLoading={isLoading} />}
      </article>
    </section>
  );
};

export default UsersPage;
