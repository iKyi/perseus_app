// import { store } from "app/store";
import axios from "axios";
// import { newSnackbar } from "features/global/globalSlice";

const axiosInstance = axios.create({
  timeout: 120000,
});

axiosInstance.interceptors.response.use(
  function (response: any) {
    // ends here
    return response;
  },
  function (error) {
    // bind for error message snackbar
    // const errorMessage = error.response?.data?.message;
    // if (errorMessage) {
    //   store.dispatch(
    //     newSnackbar({
    //       id: `ApiCall${Math.random()}`,
    //       content: errorMessage,
    //       variant: "error",
    //     })
    //   );
    // }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
