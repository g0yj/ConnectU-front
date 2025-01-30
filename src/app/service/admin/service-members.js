import {
  getUsers,
} from "../../remote/admin/api-users";

const TAG = "[service-members]";

// 회원 기본
const ServiceMember = {
  /**
   * @param {*} data
   * data: { page, limit, startDate, endDate, search, keyword}
   */
  getList: (data) => {
    console.log(TAG, "getMemberList", "data", data);
    return getUsers(data);
  },
};

export default ServiceMember;
