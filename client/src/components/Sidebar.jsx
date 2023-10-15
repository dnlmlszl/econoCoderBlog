import { useState } from 'react';
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import Button from './Button';
import { useGlobalContext } from '../context/blogContext';

const Sidebar = ({ blogFormRef }) => {
  const { user, handleLogout: onLogout } = useGlobalContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };
  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`transition-all duration-500 fixed left-0 top-[120px] h-screen bg-slate-800 p-4 ${
        isExpanded ? 'w-64' : 'w-16'
      } flex flex-col items-center justify-start`}
    >
      <ul className="flex flex-col items-center space-y-4">
        <li className="flex items-center justify-between w-full">
          {isExpanded ? (
            <p className="text-yellow-600 hover:text-yellow-700 capitalize font-medium text-lg">
              {user ? `logged in as ${user?.username}` : null}
            </p>
          ) : (
            <div className="inline-block text-yellow-600 rounded-full">
              <AiOutlineUser size={32} />
            </div>
          )}
        </li>
        <li className="flex items-center justify-between w-full">
          {isExpanded ? (
            <Button
              onClick={handleToggleBlogForm}
              className="focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 bg-yellow-600 hover:bg-yellow-700 text-slate-800"
            >
              Add new blog
            </Button>
          ) : (
            <div className="inline-block text-yellow-600 rounded-full">
              <AiOutlinePlusCircle size={32} />
            </div>
          )}
        </li>
        <li className="flex items-center justify-between w-full">
          {user ? (
            isExpanded ? (
              <Button
                onClick={onLogout}
                className="focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 bg-yellow-600 hover:bg-yellow-700 text-slate-800"
              >
                Logout
              </Button>
            ) : (
              <div className="inline-block text-yellow-600 rounded-full">
                <AiOutlineLogout size={32} />
              </div>
            )
          ) : isExpanded ? (
            <Button className="focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 bg-yellow-600 hover:bg-yellow-700 text-slate-800">
              Login
            </Button>
          ) : (
            <div className="inline-block text-yellow-600 rounded-full">
              <AiOutlineLogin size={32} />
            </div>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
