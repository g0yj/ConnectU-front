import {
    postEmail
} from "../../remote/admin/api-common"

const ServiceCommon = {
    sendEmail: async (data) => {
        return await postEmail(data);
    },
}

export default ServiceCommon;