import user from "../framework/services/user";
import config from "../framework/config";

describe("ADD BOOKS TO USER", () => {
  test("Запрос на добавление книги возвращает 201 и массив с книгой", async () => {
    const token = await user.getToken();
    const response = await user.addBooks(token);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      books: [{ isbn: config.isbn }],
    });
  });

  test("Запрос на добавление книги возвращает 400 и код ошибки 1210, если книга есть в коллекции", async () => {
    const token = await user.getToken();
    const response = await user.addBooks(token);
    expect(response.status).toEqual(400);
    expect(response.body.code).toEqual("1210");
    expect(response.body.message).toEqual(
      "ISBN already present in the User's Collection!"
    );
  });

  test("Запрос на добавление книги возвращает 401 и код ошибки 1200, если юзер не авторизован", async () => {
    const response = await user.addBooks(null);
    expect(response.status).toEqual(401);
    expect(response.body.code).toEqual("1200");
    expect(response.body.message).toEqual("User not authorized!");
  });

  test("All books have been deleted from the user collection", async () => {
    const token = await user.getToken();
    const response = await user.deleteBooks(token);
    expect(response.status).toEqual(204);
  });
});
