import { api } from "./api.js";

const TAG = "[api-users]";

// [GET]/users
const getUsers = async (requestParams) => {
  console.log(TAG, `getUsers([GET]/users)`, "requestParams", requestParams);
  const res = await api.get(`/users`, { params: requestParams });
  return res.data;
};


export {getUsers};
