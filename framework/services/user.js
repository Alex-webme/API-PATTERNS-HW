import supertest from "supertest";
import config from "../config";

const user = {
  // Функция получения токена
  async getToken() {
    const response = await supertest(config.url)
      .post("/account/v1/generatetoken")
      .send(config.credentials);
    return response.body.token;
  },

  // Функция получения токена из кэша
  // async getTokenWithCache() {
  //   // if (token) {
  //   //   return token;
  //   // }
  //   // token = await this.getToken();
  //   // return token;
  //   return token ?? this.getToken();
  // },

  addBooks: (token) => {
    return supertest(config.url)
      .post("/bookstore/v1/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: config.userId,
        collectionOfIsbns: [
          {
            isbn: config.isbn,
          },
        ],
      });
  },

  deleteBooks: (token) => {
    return supertest(config.url)
      .delete("/bookstore/v1/books")
      .query({ UserId: config.userId })
      .set("Authorization", `Bearer ${token}`)
      .send();
  },
};

export default user;
