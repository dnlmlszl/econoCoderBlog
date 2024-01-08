import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white bg-opacity-10 backdrop-blur-md text-white py-4 md:p-6">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Quick Links Section */}
          <div className="flex flex-col md:flex-row justify-between text-center md:text-left mb-4 md:mb-0">
            {/* <h3 className="font-semibold mb-2 md:mb-0">Quick Links</h3> */}
            <ul className="flex flex-wrap justify-center gap-2 md:gap-4 text-gray-400">
              <li>
                <a
                  href="https://econocoder.onrender.com"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="mailto:daniel.mlaszlo@yahoo.com"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Copyright Section */}
          <div className="text-center md:text-left text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} econo
            <span className="text-yellow-800">Coder</span> Blog App. All rights
            reserved.
          </div>

          {/* Social Links Section */}
          <div className="flex justify-center md:justify-end gap-4">
            <a
              href="https://twitter.com/dn1el_lszl0"
              className="hover:text-gray-400"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/lászló-dániel-a39a956b/"
              className="hover:text-gray-400"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="mailto:daniel.mlaszlo@yahoo.com"
              className="hover:text-gray-400"
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
