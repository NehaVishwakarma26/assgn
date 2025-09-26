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
      avatar: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?semt=ais_incoming&w=740&q=80",
    });
  }
  return data;
};
