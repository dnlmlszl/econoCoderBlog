import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="text-white py-8 md:py-4 bg-white bg-opacity-10 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 md:gap-0">
        {/* Quick Links Section */}
        <div className="flex-1 flex justify-center mb-4 md:justify-start md:mb-0 order-2 md:order-1">
          <div>
            <h3 className="text-lg text-center font-semibold">Quick Links</h3>
            <ul className="text-gray-400 text-sm text-center mt-2 grid grid-cols-2 gap-x-2">
              <li>
                <a
                  href="https://econocoder.onrender.com"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="mailto:daniel.mlaszlo@yahoo.com"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex-1 flex justify-center order-1 md:order-2">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} econo
            <span className="text-yellow-800">Coder</span> Blog App. All rights
            reserved.
          </p>
        </div>

        {/* Social Links Section */}
        <div className="flex-1 flex justify-center md:justify-end gap-4 order-3">
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
      </div>
    </footer>
  );
};

export default Footer;
