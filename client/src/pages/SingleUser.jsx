import React from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/blogContext';

const singleUserQuery = (id) => {
  return {
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await axios.get(`/api/v1/users/${id}`);
      console.log('Fetch user in query', data);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    try {
      await queryClient.ensureQueryData(singleUserQuery(id));
    } catch (error) {
      if (error.response.status === 401) {
        return redirect('/');
      }
      console.error(error);
    }

    return { id };
  };

const SingleUser = () => {
  const { setNotification } = useGlobalContext();

  //   const navigate = useNavigate();

  //   const queryClient = useQueryClient();
  //   queryClient.invalidateQueries('users');

  const loaderData = useLoaderData();

  //   if (!loaderData || !loaderData?.id) {
  //     navigate('/');
  //     return null;
  //   }
  const { id } = loaderData;

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery(singleUserQuery(id));

  console.log('Fetch user in component', user);

  return <div>SingleUser</div>;
};

export default SingleUser;
