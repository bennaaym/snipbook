import { useLocation, useNavigate } from "react-router-dom";

export const useRedirectAfterAuth = (defaultTarget?: string) => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const target = defaultTarget || location.state?.from?.pathname || "/";
  return () => navigate(target);
};
