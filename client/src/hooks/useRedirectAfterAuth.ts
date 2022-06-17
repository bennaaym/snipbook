import { useLocation, useNavigate } from "react-router-dom";

export const useRedirectAfterAuth = (defaultTarget?: string): (() => void) => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const target = location.state?.from?.pathname || "/";
  return () => navigate(target);
};
