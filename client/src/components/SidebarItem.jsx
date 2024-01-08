import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/blogContext';

const SidebarItem = ({ item }) => {
  const { setIsSidebarOpen } = useGlobalContext();

  const handleClick = () => {
    if (item.action) {
      item.action();
    }
    setIsSidebarOpen(false);
  };

  return (
    <li className="flex w-full">
      <Link
        to={item.path}
        onClick={handleClick}
        className="text-white flex items-center px-4 py-2 hover:bg-gray-700/30 rounded w-full"
      >
        <div className="flex-1 flex items-center">
          {item.icon}
          <span className="ml-2">{item.name}</span>
        </div>
      </Link>
    </li>
  );
};

export default SidebarItem;
