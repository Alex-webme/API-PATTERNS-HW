import supertest from "supertest";
import config from "../config";
import userData from "../helpers/genUserData";

const user = {
  create: () => {
    return supertest(config.url).post("/api/v1/register").send({
      email: userData.email,
      id: userData.id,
      password: userData.password,
      username: userData.username,
    });
  },
};

export default user;
