import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = JSON.parse(localStorage.getItem('authData'))?.token;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;