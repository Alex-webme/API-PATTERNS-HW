import user from "../framework/services/user";
import config from "../framework/config";

describe("ADD BOOKS TO USER", () => {
  test("Before tests run: all books have been deleted from the user collection", async () => {
    const token = await user.getToken();
    console.log(token);
    const response = await user.deleteBooks(token);
    expect(response.status).toEqual(204);
  });

  test("Пользователь может добавить книги в свою коллекцию", async () => {
    const token = await user.getToken();
    console.log(token);
    const response = await user.addBooks(token);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      books: [{ isbn: config.isbn }],
    });
  });

  test("Запрос на добавление книги возвращает 400 и код ошибки 1210, если книга была добавлена в коллекции ранее", async () => {
    const token = await user.getToken();
    console.log(token);
    const response = await user.addBooks(token);
    expect(response.status).toEqual(400);
    expect(response.body.code).toEqual("1210");
    expect(response.body.message).toEqual(
      "ISBN already present in the User's Collection!"
    );
  });

  test("Запрос на добавление книги возвращает 401 и код ошибки 1200, если юзер не авторизован", async () => {
    const response = await user.addBooks("NO TOKEN");
    expect(response.status).toEqual(401);
    expect(response.body.code).toEqual("1200");
    expect(response.body.message).toEqual("User not authorized!");
  });
});
