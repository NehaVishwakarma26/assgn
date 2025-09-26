// src/data/generateData.js
import { faker } from '@faker-js/faker';

export const generateCustomers = (count = 100) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      score: faker.number.int({ min: 0, max: 100 }),
      lastMessageAt: faker.date.recent(),
      addedBy: faker.person.fullName(),
      avatar: faker.image.avatar(),
    });
  }
  return data;
};
