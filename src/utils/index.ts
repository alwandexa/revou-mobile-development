import {faker, tr} from "@faker-js/faker";

export const capitalizeFirstChar = (text: string) => {
  return `${text.charAt(0).toUpperCase() + text.slice(1)}`;
};

export const generateFeedData = (count = 5) => {
  const generateFeedItem = () => {
    return {
      avatar_url: faker.image.avatar(),
      name: faker.person.firstName(),
      headline: faker.person.jobTitle(),
      created_at: faker.date.recent().toISOString(),
      post_header: faker.lorem.sentence(),
      post_content: faker.lorem.paragraph(),
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
