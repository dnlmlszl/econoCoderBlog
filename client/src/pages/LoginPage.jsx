import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaHome, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';
import LoginForm from '../components/LoginForm';
import registerBg from '../assets/register.jpg';
import SkeletonScreen from '../components/SkeletonScreen';

const LoginPage = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = registerBg;
    img.onload = () => {
      setTimeout(() => setImageLoaded(true), 400);
    };
  }, []);

  return (
    <section
      className="min-h-fit lg:min-h-screen flex flex-col-reverse gap-8 lg:flex-row justify-center items-center p-6"
      style={{
        backgroundImage: `url(${registerBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {imageLoaded ? (
        <>
          <article className="text-center text-white w-full lg:w-1/2 flex flex-col justify-between gap-6">
            <h1 className="text-dynamich2 mb-4">
              It's time for you to join our community!
            </h1>
            <p className="text-dynamicp text-center mb-8 w-8/12 mx-auto">
              Please login, we're extremely excited to hear about your
              wonderfull stories. Your privacy is important for us!
            </p>
            <small className="text-dynamicp flex justify-center items-center gap-4">
              <span className="w-[30px] h-[1px] bg-white"></span>
              <span className="inline-block">Visit me</span>
              <span className="w-[30px] h-[1px] bg-white"></span>
            </small>
            <div className="flex-1 flex justify-center lg:justify-center gap-10">
              <div className="mb-4">
                <a
                  href="https://twitter.com/dn1el_lszl0"
                  className="text-white hover:text-gray-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter size={20} />
                </a>
              </div>
              <div className="mb-4">
                <a
                  href="https://www.linkedin.com/in/l%C3%A1szl%C3%B3-d%C3%A1niel-a39a956b/"
                  className="text-white hover:text-gray-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedinIn size={20} />
                </a>
              </div>
              <div className="mb-4">
                <a
                  href="mailto:daniel.mlaszlo@yahoo.com"
                  className="text-white hover:text-gray-400"
                  target="_blank"
                  rel="noreferrer"
                >
                  <HiOutlineMailOpen size={20} />
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-2 py-1 border-b-2 border-l-2 border-white text-white hover:text-gray-300"
              >
                <FaHome size={24} className="mr-2 mb-1 align-middle" />{' '}
                <span className="text-dynamich3 align-middle">Back Home</span>
              </Link>
            </div>
          </article>

          <article className="text-center w-full lg:w-1/2">
            <LoginForm />
          </article>
        </>
      ) : (
        <SkeletonScreen />
      )}
    </section>
  );
};

export default LoginPage;
