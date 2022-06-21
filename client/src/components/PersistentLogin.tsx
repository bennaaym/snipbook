import { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth, useRefreshToken } from "../hooks";
import Loading from "./Loading";

const PersistentLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { data: auth } = useAuth();

  useEffect(() => {
    console.log("Persistent Login");
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
    return () => {
      isMounted = false;
    };
  }, [auth, refresh]);

  // useEffect(() => {
  //   console.log(`isLoading: ${loading}`);
  //   console.log(`auth:${JSON.stringify(auth)}`);
  // }, [loading, auth]);

  return <Fragment>{loading ? <Loading /> : <Outlet />}</Fragment>;
};

export default PersistentLogin;
