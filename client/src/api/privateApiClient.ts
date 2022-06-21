import axios from "axios";

const privateApiClient = () => {
  const { REACT_APP_API } = process.env;

  return axios.create({
    baseURL: REACT_APP_API,
    responseType: "json",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export default privateApiClient();
