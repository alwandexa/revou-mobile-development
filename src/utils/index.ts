import CryptoJS from "react-native-crypto-js";
import {faker} from "@faker-js/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InvestlyServices from "@services/InvestlyServices";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios, {AxiosError} from "axios";
import analytics from "@react-native-firebase/analytics";

dayjs.extend(relativeTime);

const ENCRYPTION_KEY = "qR9WpNeTFrptmW8oYiZA78v4DbF8iuEt";

export const capitalizeFirstChar = (text: string) => {
  return `${text.charAt(0).toUpperCase() + text.slice(1)}`;
};

export const formatRelativeTime = (date: Date | string | number): string => {
  const now = dayjs();
  const then = dayjs(date);
  const diffInSeconds = now.diff(then, "second");

  if (diffInSeconds < 60) {
    return "baru saja";
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} menit yang lalu`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} jam yang lalu`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} hari yang lalu`;
  }

  return then.format("DD-MM-YYYY");
};

export const generateFeedData = (count = 5) => {
  const generateFeedItem = () => {
    return {
      avatar_url: faker.image.avatar(),
      name: faker.person.firstName(),
      headline: faker.person.jobTitle(),
      created_at: faker.date.recent().toISOString(),
      post_header: faker.lorem.sentence(),
      post_content: faker.lorem.paragraph(5),
      post_topic: faker.helpers.arrayElement([
        "Investasi",
        "Sector Update",
        "Financial News",
        "Market Analysis",
      ]),
      post_upvote: faker.number.int({min: 0, max: 1000}),
      post_downvote: faker.number.int({min: 0, max: 1000}),
      post_comment: faker.number.int({min: 0, max: 100}),
      post_retweet: faker.number.int({min: 0, max: 50}),
    };
  };

  return Array.from({length: count}, generateFeedItem);
};

export const getAccessToken = async () => {
  try {
    const encryptedAccessToken = (await AsyncStorage.getItem(
      "access_token",
    )) as string;
    const accessToken = decryptData(encryptedAccessToken);
    return accessToken;
  } catch (error) {
    console.error("Error getting access token", error);
    return null;
  }
};

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const setUserData = async (
  access_token: string,
  refresh_token: string,
) => {
  try {
    const encryptedAccessToken = encryptData(access_token);
    const encryptedRefreshToken = encryptData(refresh_token);

    await AsyncStorage.setItem("access_token", encryptedAccessToken);
    await AsyncStorage.setItem("refresh_token", encryptedRefreshToken);

    const getUserResponse = await InvestlyServices.getUserProfile();

    const encryptedUserData = encryptData(
      JSON.stringify(getUserResponse.data.data),
    );

    await AsyncStorage.setItem("user_data", encryptedUserData);

    return getUserResponse.data.data;
  } catch (error) {
    console.error("Error setting user data: ", error);
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const encryptedUserData = await AsyncStorage.getItem("user_data");

    if (!encryptedUserData) {
      console.log("No user data found in AsyncStorage");
      return null;
    }

    const userData = decryptData(encryptedUserData);

    return JSON.parse(userData);
  } catch (error) {
    console.error("Error getting user data: ", error);
    return null;
  }
};

export const validateEmail = async (email: string) => {
  let isValid = false;
  let message = "";

  email = email.trim().toLowerCase();

  if (email.length > 254) {
    message = "Email terlalu panjang (max 254 karakter)";
    return {isValid, message};
  }

  const illegalChars = /[(),<>:;\[\]"]/;
  if (illegalChars.test(email)) {
    message = "Email mengandung karakter ilegal ((),<>:;[])";
    return {isValid, message};
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    message = "Format email salah (nama@domain.com)";
    return {isValid, message};
  }

  try {
    const checkEmailRequest = {email};
    const response = await InvestlyServices.checkEmail(checkEmailRequest);

    if (response.data.status) {
      isValid = true;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<any>;
      message = axiosError.response?.data.messages || "Email sudah digunakan";
      analytics().logEvent("failed_validate_register_email", {email});
    } else {
      console.error("Unexpected error:", err);
      message = "Terjadi kesalahan yang tidak terduga";
    }
  }

  return {isValid, message};
};

export const validatePassword = (password: string) => {
  let isValid = false;
  let message = "";

  const MIN_LENGTH = 8;
  const MAX_LENGTH = 64;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password,
  );

  if (password.length < MIN_LENGTH) {
    message = `Password minimal ${MIN_LENGTH} karakter`;
    return {isValid, message};
  }

  if (password.length > MAX_LENGTH) {
    message = `Password maksimal ${MAX_LENGTH} karakter`;
    return {isValid, message};
  }

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    message =
      "Password harus mengandung huruf besar-kecil, angka, dan karakter khusus";
    return {isValid, message};
  }

  isValid = true;
  return {isValid, message};
};

export const validatePasswordConfirmation = (
  password: string,
  confirmation: string,
) => {
  let isValid = false;
  let message = "";

  if (password !== confirmation) {
    message = "Konfirmasi password tidak sesuai";
    return {isValid, message};
  }

  isValid = true;
  return {isValid, message};
};

export const validateName = (name: string) => {
  let isValid = false;
  let message = "";

  if (name.trim().length === 0) {
    message = "Nama tidak boleh kosong";
    return {isValid, message};
  }

  if (name.trim().length < 3) {
    message = "Nama minimal 3 karakter";
    return {isValid, message};
  }

  isValid = true;
  return {isValid, message};
};

export const validateUsername = async (username: string) => {
  let isValid = false;
  let message = "";

  username = username.trim();
  if (username.length === 0) {
    return {isValid, message};
  }

  try {
    const checkUserRequest = {username};
    const response = await InvestlyServices.checkUsername(checkUserRequest);

    if (response.data.status) {
      message = response.data.messages;
      analytics().logEvent("failed_validate_register_username", {username});
    } else {
      isValid = true;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<any>;
      message = axiosError.response?.data.messages || "Validasi error";
      isValid = true;
    } else {
      console.error("Unexpected error:", err);
      message = "Terjadi kesalahan yang tidak terduga";
    }
  }

  return {isValid, message};
};
