import user from "../framework/services/user";
import books from "../framework/services/books";
import config from "../framework/config";

beforeAll(async () => {
  const token = await user.getAuthToken();
  process.env.TOKEN = token;
});

describe("POST /bookstore/v1/books", () => {
  test("Предусловия выполнены: все книги были удалены из коллекции юзера", async () => {
    const response = await books.delete(process.env.TOKEN);
    expect(response.status).toEqual(204);
  });

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
    const response = await books.add(); // не передаем токен, чтобы имитировать Unauthorized
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      code: "1200",
      message: "User not authorized!",
    });
  });
});
