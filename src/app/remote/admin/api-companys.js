import { api } from "./api.js";

const TAG = "[api-companys]";

// [GET] /company
const getCompanys = async (requestParams) => {
  console.log(TAG, `getUsers([GET]/companys)`, "requestParams", requestParams);
  const res = await api.get(`/company`, { params: requestParams });
  return res.data;
}

// [GET] / company/{id}
const getCompany = async (id) => {
  console.log(TAG, `getCompany([GET]/company/{id})`, "id", id);
  const res = await api.get(`/company/${id}`);
  return res.data;
}
export {getCompanys, getCompany };
