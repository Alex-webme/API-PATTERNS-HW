const { faker } = require("@faker-js/faker");

const userData = {
  email: faker.internet.email(),
  password: faker.internet.password(16, false, /[A-Z]/),
  username: faker.internet.userName(),
};

export default userData;
