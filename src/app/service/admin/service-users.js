import {
  getUsers,
  postUser,
  getUser,
  putUser
} from "../../remote/admin/api-users";

const TAG = "[service-users]";

// 회원 기본
const ServiceMember = {
  /**
   * @param {*} data
   * data: { page, limit, startDate, endDate, search, keyword}
   */
  getList: (data) => {
    console.log(TAG, "getList", "data", data);
    return getUsers(data);
  },

  register: (data) => {
    console.log(TAG, "register", "data", data)
    return postUser(data);
  },

  get: (id) => {
    console.log(TAG, "get", "id", id);
    return getUser(id);
  },

  update: (id, data) => {
    console.log(TAG, "updateUser", "id", id, "data", data);
    return putUser(id, data);
  }
};

export default ServiceMember;
