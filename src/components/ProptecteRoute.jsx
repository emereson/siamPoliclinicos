import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

const ProtectedRoutes = () => {
  const { id } = useParams();
  if (localStorage.getItem("access_token")) {
    return <Outlet />;
  } else {
    return <Navigate to={`/policlinicos/${id}/login`} />;
  }
};

export default ProtectedRoutes;
