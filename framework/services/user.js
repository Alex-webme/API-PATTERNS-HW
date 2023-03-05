import supertest from "supertest";
import config from "../config";

const user = {
  async getAuthToken() {
    const response = await supertest(config.url)
      .post("/account/v1/generatetoken")
      .send(config.credentials);
    return response.body.token;
  },
};

export default user;
