import {
  getCompanys,
} from "../../remote/admin/api-companys";

const TAG = "[service-companys]";

// 업체관리
const ServiceCompany = {
  /**
   * @param {*} data
   * data: { page, limit, startDate, endDate, search, keyword}
   */
  getList: (data) => {
    console.log(TAG, "getList", "data", data);
    return getCompanys(data);
  }
};

export default ServiceCompany;
