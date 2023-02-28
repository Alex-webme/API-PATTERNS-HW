const { faker } = require("@faker-js/faker");

const userData = {
  email: faker.internet.email(),
  id: faker.datatype.number(100),
  password: faker.internet.password(16, false, /[A-Z]/),
  username: faker.internet.userName(),
};

export default userData;
