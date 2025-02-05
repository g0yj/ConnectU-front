import { api } from "./api";


const postEmail = async (data) => {
    await api.post(`/email/send`, data);
}

export {postEmail}