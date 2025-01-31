import axios from "axios";

const postLogin = async (data) => {
  const res = await axios.post(`http://localhost:8080/api/admin/v1/login`, data, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Accept: "application/json; charset=UTF-8",
    },
  });

  return res.data;
};

const postLogout = async (token) => {
  const res = await axios.post(`http://localhost:8080/api/admin/v1/logout`, null, {
    headers: {
      "Authorization": token, // 🔥 서버에 토큰 포함하여 로그아웃 요청
    },
  });

  return res.data;
};
export { postLogin, postLogout };
