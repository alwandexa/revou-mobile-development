import {faker, tr} from "@faker-js/faker";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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
