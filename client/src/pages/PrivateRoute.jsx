import { useGlobalContext } from '../context/blogContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useGlobalContext();

  return user ? children : <Navigate to="/" replace={true} />;
};

export default PrivateRoute;
