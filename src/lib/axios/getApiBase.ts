import { API_URL } from "constants/general_contants";

const getApiBase = () => {
  // return !process.env.REACT_APP_RPC_URL?.includes("ssc-dao")
  //   ? "https://api-dt-api-dt-dev.azurewebsites.net/api/"
  //   : "https://api-dt.azurewebsites.net/api/";
  return API_URL;
};

export default getApiBase;
