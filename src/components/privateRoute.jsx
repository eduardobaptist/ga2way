import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
