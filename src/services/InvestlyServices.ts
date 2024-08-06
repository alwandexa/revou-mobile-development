import {FeedItem} from "@components/organism/Feed";
import axios from "axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: boolean;
  messages: string;
  data?: {
    access_token: string;
    refresh_token: string;
    is_verified: boolean;
    expired_at: string;
  };
};

export type RegisterRequest = {
  email: string;
  password: string;
  favorite_topic_ids: string[];
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

export type getPostListRequest = {
  sort_by: string;
  page: number;
  perpage: number;
};

export type getPostListResponse = {
  status: boolean;
  messages: string;
  meta: {
    per_page: number;
    current_page: number;
    last_page: number;
    is_load_more: boolean;
  };
  data: FeedItem[];
};

export type getPostDetailRequest = {
  id: string;
};

export type getPostDetailResponse = {
  status: boolean;
  messages: string;
  data: FeedItem;
};

export const BASE_URL = "https://develop.investly.id/";

const InvestlyServices = {
  login: async (body: LoginRequest) => {
    return await axios.post(`${BASE_URL}api/auth/v2/login`, body, {
      headers: {"Content-Type": "application/json"},
    });
  },
  register: async (body: RegisterRequest) => {
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
    return await axios.get(
      `${BASE_URL}api/social/v1/public/username/${body.username}`,
    );
  },
  getTopics: async () => {
    return await axios.get(`${BASE_URL}api/social/v1/public/masterdata/topic`);
  },
  getPostList: async (params: getPostListRequest) => {
    return await axios.get<getPostListResponse>(
      `${BASE_URL}api/social/v2/feed`,
      {params},
    );
  },
  getPostDetail: async (params: getPostDetailRequest) => {
    return await axios.get<getPostDetailResponse>(
      `${BASE_URL}/api/social/v1/public/post/${params.id}`,
    );
  },
};

export default InvestlyServices;
