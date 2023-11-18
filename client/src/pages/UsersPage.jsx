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
      console.log('Fetching users', data);
      return data;
    },
  };
};

// export const loader = (queryClient) => {
//   return async () => {
//     await queryClient.ensureQueryData(usersQuery());

//     return {};
//   };
// };

export const loader = (queryClient) => {
  return async () => {
    await queryClient.prefetchQuery(usersQuery());

    return {};
  };
};

const UsersPage = () => {
  const { setNotification, user: loggedInUser } = useGlobalContext();
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: userService.fetchUser,
  });
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery({ ...usersQuery(), enabled: !isUserLoading || !!user });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      queryClient.invalidateQueries('users');
    }
  }, [user, queryClient]);

  useEffect(() => {
    if (isError) {
      setNotification({ type: 'error', message: error.message });
      const timer = setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError, error, setNotification]);

  if (isLoading || isUserLoading) return <div className="loading" />;

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
        {<UserList users={users} blogUser={user} />}
      </article>
    </section>
  );
};

export default UsersPage;
