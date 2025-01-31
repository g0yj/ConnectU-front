import storage from "@/app/local/admin/local-storage";
import { postLogin, postLogout } from "../../remote/admin/api-auth";

const TAG = "service-auth";

const ServiceAuth = {
  login: (data) => {
    console.log(TAG, "login", data);
    return postLogin(data);
  },

  logout: () => {
    console.log(TAG, "logout");
    const token = storage.loginedToken.get();
    if (!token) {
      console.warn("로그아웃 요청 시 토큰이 없습니다."); // 토큰이 없으면 경고만 출력하고 요청 X
      return Promise.resolve();
    }
    return postLogout(token);
  },
};

export default ServiceAuth;
