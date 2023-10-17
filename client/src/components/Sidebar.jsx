import { useState } from 'react';
import {
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import SidebarItem from './SidebarItem';
import { useGlobalContext } from '../context/blogContext';

const Sidebar = ({ blogFormRef }) => {
  const { user, handleLogout: onLogout } = useGlobalContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

  const itemsConfig = [
    {
      text: user ? `logged in as ${user?.username}` : null,
      icon: <AiOutlineUser size={32} />,
    },
    {
      text: 'Add new blog',
      icon: <AiOutlinePlusCircle size={32} />,
      onClick: handleToggleBlogForm,
    },
    {
      text: user ? 'Logout' : 'Login',
      icon: user ? <AiOutlineLogout size={32} /> : <AiOutlineLogin size={32} />,
      onClick: user ? onLogout : null,
    },
  ];

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`transition-all duration-500 fixed left-0 top-[120px] h-screen bg-slate-800 p-4 ${
        isExpanded ? 'w-64' : 'w-16'
      } flex flex-col items-center justify-start`}
    >
      <ul className="flex flex-col items-center space-y-4">
        {itemsConfig.map((item, index) => (
          <SidebarItem
            key={index}
            text={item.text}
            icon={item.icon}
            onClick={item.onClick}
            isExpanded={isExpanded}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
