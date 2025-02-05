import {
    postEmail,
    postSms,
} from "../../remote/admin/api-common"

const ServiceCommon = {
    sendEmail: async (data) => {
        return await postEmail(data);
    },
    sendSms: async (data) => {
        return await postSms(data);
    }

}

export default ServiceCommon;