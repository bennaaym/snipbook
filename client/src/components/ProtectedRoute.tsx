import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";

const ProtectedRoute = () => {
  const { data: auth } = useAuth();
  const location = useLocation();
  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
