import { api } from "./api.js";

const TAG = "[api-companys]";

// [GET] /company
const getCompanys = async (requestParams) => {
  console.log(TAG, `getUsers([GET]/companys)`, "requestParams", requestParams);
  const res = await api.get(`/company`, { params: requestParams });
  return res.data;
}

export {getCompanys};
