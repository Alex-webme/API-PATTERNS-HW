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

  replace: (token) => {
    return supertest(config.url)
      .put(`/bookstore/v1/books/${config.isbn}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        userId: config.userId,
        isbn: config.newIsbn,
      });
  },

  getSpecificBook: (isbn) => {
    return supertest(config.url)
      .get("/bookstore/v1/book")
      .query({ ISBN: `${isbn}` })
      .send();
  },

  deleteSpecificBook: (token, isbn) => {
    return supertest(config.url)
      .delete("/bookstore/v1/book")
      .set("Authorization", `Bearer ${token}`)
      .send({
        isbn: isbn,
        userId: config.userId,
      });
  },
};

export default books;
