const { faker } = require("@faker-js/faker");

const randomData = {
  username: `${faker.name.firstName()}.${faker.name.lastName()}`,
  password: faker.internet.password(16, false, /[A-Z]/),
  fakeISBN: faker.random.numeric(13),
};

// console.log(
//   `username: ${randomData.username}`,
//   `password: ${randomData.password}`,
//   `fakeISBN: ${randomData.fakeISBN}`
// );

export default randomData;
