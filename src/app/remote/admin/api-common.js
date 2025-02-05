import { api } from "./api";


const postEmail = async (data) => {
    await api.post(`/email/send`, data);
}

const postSms = async (data) => {
    await api.post(`/sms/send`, data);
}

export {postEmail, postSms}