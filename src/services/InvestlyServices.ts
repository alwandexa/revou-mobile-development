import axios from "axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type CheckEmailRequest = {
  email: string;
};

export type CheckEmailResponse = {
  status: string;
  messages: string;
};

export const BASE_URL = "https://develop.investly.id/";

const InvestlyServices = {
  login: async (body: LoginRequest) => {
    return await axios.post(`${BASE_URL}api/auth/v2/login`, body, {
      headers: {"Content-Type": "application/json"},
    });
  },
  checkEmail: async (body: CheckEmailRequest) => {
    return await axios.post(`${BASE_URL}api/auth/v1/email/check`, body, {
      headers: {"Content-Type": "application/json"},
    });
  },
  getTopics: async () => {
    return await axios.get(`${BASE_URL}api/social/v1/public/masterdata/topic`);
  },
};

export default InvestlyServices;
