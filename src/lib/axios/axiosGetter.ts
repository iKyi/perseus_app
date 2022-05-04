import { AxiosError } from "axios";
import { API_URL } from "constants/general_contants";
import axiosInstance from "./axiosInstance";

const axiosGetter = async (url: string) => {
  return axiosInstance
    .get(url)
    .then((resp) => {
      const { data } = resp;
      return data?.attributes ?? data;
    })
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });
};

export const axiosStrapiGetter = async (url: string) => {
  const strapiUrl = API_URL;
  if (!strapiUrl) {
    throw new Error("No strapi located");
  }

  return axiosInstance
    .get(`${strapiUrl}${url}`)
    .then((resp) => {
      const { data } = resp;
      return data?.attributes ?? data;
    })
    .catch((err: AxiosError) => {
      throw new Error(err.message);
    });
};

export default axiosGetter;
