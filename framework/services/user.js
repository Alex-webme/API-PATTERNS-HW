import supertest from "supertest";
import config from "../config";

const user = {
  getAuthToken: async (payload) => {
    const res = await supertest(config.url)
      .post("/account/v1/generatetoken")
      .set("Accept", "application/json")
      .send(payload);
    return res.body.token;
  },

  addBook: (token, payload) => {
    return supertest(config.url)
      .post("/bookstore/v1/books")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);
  },
};

export default user;
