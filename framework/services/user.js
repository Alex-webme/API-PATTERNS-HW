import supertest from "supertest";
import config from "../config";
let token = "";

const user = {
  create: () => {
    return supertest(config.url)
      .post("/account/v1/user")
      .send(config.credentials);
  },

  // Функция получения токена
  async getAuthToken() {
    const payload = config.credentials;
    const res = await this.login(payload); // в API Bookstor'а есть отдельный метод, чтобы получить токен
    return res.body.token;
  },

  // Функция получения токена из кэша
  async getAuthTokenWithCache() {
    if (token) {
      return token;
    }
    token = await this.getAuthToken();
    return token;
  },

  login: (payload) => {
    return supertest(config.url).post("/api/v1/login").send(payload);
  },
};

export default user;
