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


// 에러 응답을 자동으로 처리하는 인터셉터
api.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 반환
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data.message;
      alert(errorMessage); // alert 표시
    } else {
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
    return Promise.reject(error);
  }
);


export { api};
