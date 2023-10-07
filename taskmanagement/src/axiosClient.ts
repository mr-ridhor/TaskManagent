import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});



axiosClient.interceptors.request.use((AxiosRequestConfig) => {
  const token = localStorage.getItem("access_token");
  AxiosRequestConfig.headers.Authorization = `Bearer ${token}`;

  return AxiosRequestConfig;
});

axiosClient.interceptors.response.use(
  (AxiosResponse) => {
    return AxiosResponse;
  },
  (error) => {
    try {
      
    } catch (e) {
      console.error(e);
    }

    console.log(error);
    throw error;
  }
);

export default axiosClient;
