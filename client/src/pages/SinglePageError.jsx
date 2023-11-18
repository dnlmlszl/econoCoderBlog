import { useRouteError } from 'react-router-dom';

const SinglePageError = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <h2 className="text-dynamich2 text-gray-600 mt-5 font-normal leading-4 tracking-wide capitalize">
      {error.message}
    </h2>
  );
};

export default SinglePageError;
