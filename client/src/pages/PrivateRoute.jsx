import { useGlobalContext } from '../context/blogContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, userLoading } = useGlobalContext();

  if (userLoading) {
    return <div className="loading" />;
  }

  if (!user || (adminOnly && user.role !== 'admin')) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default PrivateRoute;
