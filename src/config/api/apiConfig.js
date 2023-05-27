import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => config);

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);
// api.interceptors.request.use(async (config) => {
//   const customHeaders = {};

//   const accessToken = localStorage.getItem("userPresent");
//   if (accessToken.token) {
//     customHeaders.Authorization = accessToken.token;
//   }
//   return {
//     ...config,
//     headers: {
//       ...customHeaders, // auto attach token
//       ...config.headers, // but you can override for some requests
//     },
//   };
// });
export default api;
