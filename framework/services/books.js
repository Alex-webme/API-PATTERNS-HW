import supertest from "supertest";
import config from "../config";

const books = {
  add: (token) => {
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

  delete: (token) => {
    return supertest(config.url)
      .delete("/bookstore/v1/books")
      .query({ UserId: config.userId })
      .set("Authorization", `Bearer ${token}`)
      .send();
  },
};

export default books;
