import { useGlobalContext } from '../context/blogContext';
import Button from './Button';

const UserStatus = () => {
  const { user, handleLogout } = useGlobalContext();

  return (
    user && (
      <div className="flex items-center justify-between p-4">
        <p className="mr-4 text-yellow-600 capitalize">{user?.username} </p>
        <Button
          onClick={handleLogout}
          className="focus:outline-none focus:border-yellow-700 focus:ring focus:ring-yellow-200 bg-yellow-600 hover:bg-yellow-700 text-slate-800"
        >
          logout
        </Button>
      </div>
    )
  );
};
export default UserStatus;
