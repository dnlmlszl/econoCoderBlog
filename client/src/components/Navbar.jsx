import { Link, NavLink } from 'react-router-dom';
import { useGlobalContext } from '../context/blogContext';
import UserStatus from './UserStatus';

const Navbar = () => {
  const { user, isSidebarOpen, setIsSidebarOpen } = useGlobalContext();

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-white border-b-2 border-yellow-500 px-3 py-2 rounded'
      : 'text-white hover:text-yellow-500 px-3 py-2 rounded';

  return (
    <nav className="flex items-center justify-between px-3 py-3 md:px-6 w-full fixed top-0 left-0 z-10 text-white">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-2 text-white z-20 flex items-center"
      >
        <span className="sr-only">Open menu</span>
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <div className="flex items-center my-4 gap-4 md:hidden">
        {user && <UserStatus />}
      </div>

      <div className="hidden md:flex items-center justify-between w-full bg-white bg-opacity-10 backdrop-blur-md p-1 rounded-lg">
        <Link to="/">
          <h2 className="text-center text-2xl text-white px-4">
            econo<span className="text-yellow-800">Coder</span>
          </h2>
        </Link>
        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          {user && (
            <NavLink to="/users" className={linkClass}>
              Users
            </NavLink>
          )}
          {!user && (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          )}
        </div>
        <div className="flex items-center mr-6">{user && <UserStatus />}</div>
      </div>
    </nav>
  );
};

export default Navbar;
