import CryptoJS from "react-native-crypto-js";
import {faker} from "@faker-js/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InvestlyServices from "@services/InvestlyServices";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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
    const encryptedUserData = (await AsyncStorage.getItem(
      "user_data",
    )) as string;
    const userData = decryptData(encryptedUserData);

    return JSON.parse(userData);
  } catch (error) {
    console.error("Error getting user data: ", error);
    throw error;
  }
};
