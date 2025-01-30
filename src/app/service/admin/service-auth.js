import { postLogin } from "../../remote/admin/api-auth";

const TAG = "service-auth";

const ServiceAuth = {
  login: (data) => {
    console.log(TAG, "login", data);
    return postLogin(data);
  },
};

export default ServiceAuth;
