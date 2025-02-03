import {
  getUsers,
  postUser,
  getUser,
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
    console.log(`여기 들어오는지`)
    console.log(TAG, "get", "id", id);
    return getUser(id);
  }
};

export default ServiceMember;
