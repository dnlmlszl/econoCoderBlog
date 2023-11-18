import { useEffect, useState } from 'react';

const BackgroundImagePlaceholder = ({ src }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <div
      className={`transition-opacity duration-700 ease-in-out ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${loaded ? src : 'placeholder.jpg'})`,
        backgroundSize: 'cover',
        filter: loaded ? 'none' : 'blur(10px)',
        height: '100vh',
      }}
    />
  );
};

export default BackgroundImagePlaceholder;
