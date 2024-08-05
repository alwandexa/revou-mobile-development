import axios from "axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  favorite_topic_ids: [string];
  username: string;
  name: string;
};

export type CheckEmailRequest = {
  email: string;
};

export type CheckEmailResponse = {
  status: string;
  messages: string;
};

export type CheckUsernameRequest = {
  username: string;
};

export const BASE_URL = "https://develop.investly.id/";

const InvestlyServices = {
  login: async (body: RegisterRequest) => {
    return await axios.post(`${BASE_URL}api/auth/v2/login`, body, {
      headers: {"Content-Type": "application/json"},
    });
  },
  register: async (body: LoginRequest) => {
    return await axios.post(`${BASE_URL}api/auth/v4/register`, body, {
      headers: {"Content-Type": "application/json"},
    });
  },
  checkEmail: async (body: CheckEmailRequest) => {
    return await axios.post(`${BASE_URL}api/auth/v1/email/check`, body, {
      headers: {"Content-Type": "application/json"},
    });
  },
  checkUsername: async (body: CheckUsernameRequest) => {
    console.log(`${BASE_URL}api/social/v1/public/username/${body.username}`);
    return await axios.get(
      `${BASE_URL}api/social/v1/public/username/${body.username}`,
    );
  },
  getTopics: async () => {
    return await axios.get(`${BASE_URL}api/social/v1/public/masterdata/topic`);
  },
};

export default InvestlyServices;
