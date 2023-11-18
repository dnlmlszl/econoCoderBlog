import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlinePlusCircle,
  AiOutlinePoweroff,
  AiOutlineHome,
  AiOutlineUser,
} from 'react-icons/ai';
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from 'react-icons/md';
import SidebarItem from './SidebarItem';
import { useGlobalContext } from '../context/blogContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const {
    user,
    handleLogout: onLogout,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useGlobalContext();

  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      icon: <AiOutlineHome size={24} />,
      path: '/',
    },
    {
      name: 'Users',
      icon: <AiOutlineUser size={24} />,
      path: '/users',
    },
    {
      name: 'New blog',
      icon: <AiOutlinePlusCircle size={24} />,
      path: '/blog/new',
    },
  ];

  if (user) {
    navItems.push({
      name: 'Logout',
      icon: <AiOutlineLogout size={24} />,
      action: onLogout,
    });
  } else {
    navItems.push({
      name: 'Login',
      icon: <AiOutlineLogin size={24} />,
      path: '/login',
    });
  }

  return (
    <aside
      className={`fixed top-1/2 left-0 ${
        !isSidebarOpen ? 'w-8' : 'w-64'
      } transform -translate-y-1/2 h-1/3 bg-gray-800 bg-opacity-20 backdrop-blur-lg p-4 rounded-md shadow-md flex flex-col items-center justify-center transition-width duration-300 z-50`}
    >
      <div>
        <button
          className="absolute top-1/2 -right-3 transform -translate-y-1/2 text-white bg-gray-500 rounded-full p-2 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <MdKeyboardDoubleArrowLeft />
          ) : (
            <MdKeyboardDoubleArrowRight />
          )}
        </button>
        <ul className="space-y-2 mt-4">
          {isSidebarOpen &&
            navItems.map((item, index) => (
              <SidebarItem
                key={index}
                item={item}
                onClick={() => {
                  if (item.path) {
                    navigate(item.path);
                  } else if (item.action) {
                    item.action();
                  }
                }}
              />
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
