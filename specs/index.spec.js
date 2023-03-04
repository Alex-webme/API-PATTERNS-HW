import user from "../framework/services/user";
import books from "../framework/services/books";
import config from "../framework/config";
import randomData from "../framework/helpers/util";

describe("Preconditions", () => {
  it("Токен авторизации инициализирован", async () => {
    const token = await user.getAuthToken();
    process.env.TOKEN = token;
  });

  it("Коллекция книг пользователя очищена", async () => {
    const response = await books.delete(process.env.TOKEN);
    expect(response.status).toEqual(204);
  });
});

describe("POST /bookstore/v1/books", () => {
  test("Пользователь может добавить книги в свою коллекцию", async () => {
    const response = await books.add(process.env.TOKEN);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      books: [{ isbn: config.isbn }],
    });
  });

  test("Запрос на добавление книги возвращает 400 и код ошибки 1210, если книга была добавлена в коллекцию ранее", async () => {
    const response = await books.add(process.env.TOKEN);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      code: "1210",
      message: "ISBN already present in the User's Collection!",
    });
  });

  test("Запрос на добавление книги возвращает 401 и код ошибки 1200, если пользователь не авторизован", async () => {
    const response = await books.add(); // не передаем токен с целью имитировать Unauthorized
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      code: "1200",
      message: "User not authorized!",
    });
  });
});

describe("PUT /bookstore/v1/books/<ISBN>", () => {
  test("Старый экземпляр книги из коллекции заменяется на новый", async () => {
    const response = await books.replace(process.env.TOKEN);
    expect(response.status).toEqual(200);
    expect(response.body.books[0]).toHaveProperty("isbn", config.newIsbn);
  });

  test("Старый экземпляр книги из коллекции нельзя заменить на новый, если старой книги нет в коллекции", async () => {
    const response = await books.replace(process.env.TOKEN);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      code: "1206",
      message: "ISBN supplied is not available in User's Collection!",
    });
  });

  test("Старый экземпляр книги из коллекции нельзя заменить на новый, если пользователь не авторизован", async () => {
    const response = await books.replace(); // не передаем токен с целью имитировать Unauthorized
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      code: "1200",
      message: "User not authorized!",
    });
  });
});

describe("GET /bookstore/v1/book", () => {
  test("Можно получить информацию о книге", async () => {
    const response = await books.getSpecificBook(config.isbn);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      isbn: "9781491904244",
      title: "You Don't Know JS",
      subTitle: "ES6 & Beyond",
      author: "Kyle Simpson",
      publish_date: "2015-12-27T00:00:00.000Z",
      publisher: "O'Reilly Media",
      pages: 278,
      description:
        'No matter how much experience you have with JavaScript, odds are you don’t fully understand the language. As part of the \\"You Don’t Know JS\\" series, this compact guide focuses on new features available in ECMAScript 6 (ES6), the latest version of the st',
      website:
        "https://github.com/getify/You-Dont-Know-JS/tree/master/es6%20&%20beyond",
    });
  });

  test("Нельзя получить информацию о книге, если такой не существует", async () => {
    const response = await books.getSpecificBook(randomData.fakeISBN);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      code: "1205",
      message: "ISBN supplied is not available in Books Collection!",
    });
  });
});

describe("DELETE /bookstore/v1/book", () => {
  test("Пользователь может удалить книгу из своей коллекции", async () => {
    const response = await books.deleteSpecificBook(
      process.env.TOKEN,
      config.newIsbn
    );
    expect(response.status).toEqual(204);
    // В качестве ответа от сервера возвращается пустое тело, потенциально - репорт, так как ответ не соотв спецификации
    // expect(response.body).toEqual({
    //   userId: config.userId,
    //   isbn: config.newIsbn,
    //   message: "string",
    // });
  });

  test("Нельзя удалить книгу из коллекции, если она не добавлена в коллекцию", async () => {
    const response = await books.deleteSpecificBook(
      process.env.TOKEN,
      randomData.fakeISBN
    );
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({
      code: "1206",
      message: "ISBN supplied is not available in User's Collection!",
    });
  });

  test("Нельзя удалить книгу из коллекции, если пользователь не авторизован", async () => {
    const response = await books.deleteSpecificBook();
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      code: "1200",
      message: "User not authorized!",
    });
  });
});
