import store from "@/redux/store";
import axios from "axios";
import storage from "../../local/admin/local-storage";

const api = axios.create({
  baseURL: "http://localhost:8080/api/admin/v1/",
  timeout: 5000,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    Accept: "application/json; charset=UTF-8",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().loginUser.token || storage.loginedToken.get();
    config.headers["Authorization"] = token;
    return config;
  },
  (error) => console.error("request error ==>", error)
);


export { api};
