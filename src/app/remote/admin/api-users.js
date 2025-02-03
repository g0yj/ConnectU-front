import { api } from "./api.js";

const TAG = "[api-users]";

// [GET] /users
const getUsers = async (requestParams) => {
  console.log(TAG, `getUsers([GET]/users)`, "requestParams", requestParams);
  const res = await api.get(`/users`, { params: requestParams });
  return res.data;
}

// [POST] /users
const postUser = async (requestBody) => {
  console.log(TAG, `registerUser([POST]/users)`, "requestBody", requestBody);
  const res = await api.post(`/users`, requestBody);
  return res.data;
}

// [GET] /users/{id}
const getUser = async (id) => {
  console.log(TAG, `getUser([GET]/users/{id})`, "id", id);
  const res = await api.get(`/users/${id}`);
  return res.data;
}
export {getUsers, postUser, getUser};
