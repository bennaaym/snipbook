import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";

const ProtectedAuth = () => {
  const { data: auth } = useAuth();
  const location = useLocation();
  return !auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/posts" state={{ from: location }} replace />
  );
};

export default ProtectedAuth;
