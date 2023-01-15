import supertest from "supertest";
import config from "../config";

// Объект авторизации с методами авторизации / получения токена

const auth = {
  createUser: (payload) => {
    return supertest(config.url).post("/Account/v1/User").set(payload);
  },

  getToken: async (payload) => {
    const res = await supertest(config.url)
      .post("/Account/v1/GenerateToken")
      .set(payload);
    return res.body.token;
  },

  getUserId: async (payload) => {
    const res = await supertest(config.url)
      .post("/Account/v1/Authorized")
      .set(payload);
    return res.body.userId;
  },
};

export default auth;
