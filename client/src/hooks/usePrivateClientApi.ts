import { useEffect } from "react";
import privateApiClient from "../api/privateApiClient";
import { useAuth } from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";

export const usePrivateApiClient = () => {
  const refresh = useRefreshToken();
  const { data: auth } = useAuth();

  useEffect(() => {
    const requestInterceptor = privateApiClient.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers?.authorization) {
          config.headers.authorization = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = privateApiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        // if the accessToken expire
        const prevRequest = error?.config;
        if (
          (error?.response.status === 403 || error?.response.status === 401) &&
          !prevRequest?.sent
        ) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
          return privateApiClient(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      privateApiClient.interceptors.request.eject(requestInterceptor);
      privateApiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return privateApiClient;
};
