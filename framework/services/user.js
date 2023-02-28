import supertest from "supertest";
import config from "../config";
import userData from "../helpers/genUserData";
let token = "";

const user = {
  create: () => {
    return supertest(config.url).post("/api/v1/register").send({
      email: userData.email,
      id: userData.id,
      password: userData.password,
      username: userData.username,
    });
  },

  login: (payload) => {
    return supertest(config.url).post("/api/v1/login").send(payload);
  },

  // Функция получения токена
  async getAuthToken() {
    const payload = config.credentials;
    const res = await this.login(payload);
    return res.body.token;
  },

  // Функция получения токена из кэша, чтобы не генерировать новый
  async getAuthTokenWithCache() {
    if (token) {
      return token;
    }
    token = await this.getAuthToken();
    return token;
  },

  getUserInfo: (token) => {
    return supertest(config.url)
      .get("/api/v1/user")
      .set("Authorization", `Bearer ${token}`)
      .send();
  },

  changePassword: (token) => {
    return supertest(config.url)
      .post("/api/v1/user/password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        new_password: "NEWPASSWORD",
        old_password: userData.password,
      });
  },
};

export default user;
