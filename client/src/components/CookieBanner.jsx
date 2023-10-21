import { useState } from 'react';
import Button from './Button';
import { useGlobalContext } from '../context/blogContext';

const CookieBanner = () => {
  const { isLoggedIn } = useGlobalContext();
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  {
    if (isLoggedIn) {
      return (
        <div className="fixed bottom-0 left-0 w-full bg-[rgba(0,0,0,0.8)] text-white p-5 text-center z-10">
          <h2 className="text-center capitalize text-2xl text-slate-500 my-3">
            We value your privacy
          </h2>
          <p className="max-w-3xl w-full text-center text-slate-500 my-5 mx-auto">
            We use cookies to enhance your browsing experience, serve
            personalized ads or content, and analyze our traffic. By clicking
            "OK, I'm fine", you consent to our use of cookies.
          </p>
          <Button
            className="focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 bg-yellow-600 hover:bg-yellow-700 text-slate-800 ml-5"
            onClick={() => setIsVisible(false)}
          >
            OK, I'm fine
          </Button>
        </div>
      );
    }
  }
};

export default CookieBanner;
