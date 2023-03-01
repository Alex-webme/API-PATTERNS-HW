const { faker } = require("@faker-js/faker");

const randomData = {
  username: `${faker.name.firstName()}.${faker.name.lastName()}`,
  password: faker.internet.password(16, false, /[A-Z]/),
};

console.log(
  `username: ${randomData.username}`,
  `password: ${randomData.password}`
);

export default randomData;
