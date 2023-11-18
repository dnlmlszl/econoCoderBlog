import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/not-found.svg';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <section className="min-h-full text-center flex items-center justify-center">
        <div>
          <img
            src={img}
            alt="not found"
            className="w-[90vw] max-w-[600px] block mb-8 mt-[-3rem] object-cover"
          />
          <h3 className="mb-2 text-dynamich3 text-gray-600 font-normal leading-4 tracking-wide capitalize">
            Ohh!
          </h3>
          <p className="mt-2 mb-4 text-gray-500 leading-6 max-w-2xl">
            We can't seem to find page you are looking for
          </p>
          <Link to="/" className="text-gray-500 capitalize">
            back home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-full text-center flex items-center justify-center">
      <div>
        <h3 className="mb-2 text-dynamich3 text-gray-600 font-normal leading-4 tracking-wide capitalize">
          something went wrong
        </h3>
      </div>
    </section>
  );
};

export default Error;
