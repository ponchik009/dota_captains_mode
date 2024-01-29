import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../../App";

export const ProtectedRoute = () => {
  const { userError, userLoading } = React.useContext(UserContext);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
