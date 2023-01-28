import user from "../framework/services/user";
import config from "../framework/config";

describe("POST /bookstore/v1/books", () => {
  test("Запрос на добавление книги должен возвращать 201, если юзер авторизован", async () => {
    const token = await user.getAuthToken(config.credentials);
    const res = await user.addBook(token, {
      userId: config.userId,
      collectionOfIsbns: config.collectionOfIsbns,
    });
    expect(res.status).toEqual(201);
  });

  test("Запрос на добавление книги должен возвращать 401 и код ошибки 1200, если юзер не авторизован", async () => {
    const res = await user.addBook(null, {
      userId: config.userId,
      collectionOfIsbns: config.collectionOfIsbns,
    });
    expect(res.status).toEqual(401);
    expect(res.body.code).toEqual("1200");
  });

  test("Добавление книги должно возвращать 400 и код ошибки 1210, если книга была добавлена ранее", async () => {
    const token = await user.getAuthToken(config.credentials);
    const res = await user.addBook(token, {
      userId: config.userId,
      collectionOfIsbns: config.collectionOfIsbns,
    });
    expect(res.status).toEqual(400);
    expect(res.body.code).toEqual("1210");
  });
});

// Чтобы добавить книгу для юзера надо:
// Отправить запрос на создание юзера
// Отправить запрос на генерацию токена
// Отправить запрос на авторизацию (только после генерации токена мы можем получить в ответе true, как описано в доке)
// Отправить запрос на добавление книги, но в качестве заголовка прокинуть ключ Authorization
// cо значением `Bearer ${responce.data.token}`
// только после этого запрос на добавление книги станет возвращать 200 и тело, описанное в доке
// Вывод - достаточно просто захардкодить значение токена в конфиг или подставлять его динамически
// Через дополнительную функцию до запуска функции, которая отправляет запрос на создание книги
