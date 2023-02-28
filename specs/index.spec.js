import user from "../framework/services/user";
import config from "../framework/config";
import userData from "../framework/helpers/genUserData";

describe("POST /api/v1/register", () => {
  test("Создание нового пользователя возвращает 200", async () => {
    const res = await user.create();
    expect(res.status).toEqual(200);
  });

  test("Создание пользователя возвращает 400 и код ошибки 1001, если пользователь с таким юзернеймом создан ранее", async () => {
    const res = await user.create();
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      code: 1001,
      message: "A user with this username already exists.",
    });
  });
});

describe("POST /api/v1/login", () => {
  test("Авторизация с валидными логином и паролем возвращает 200", async () => {
    const res = await user.login(config.credentials);
    expect(res.status).toEqual(200);
  });

  test("Авторизация возвращает 412 и код ошибки 1011, если юзернейм неверный", async () => {
    const res = await user.login({
      username: "invalid",
      password: userData.password,
    });
    expect(res.status).toEqual(412);
    expect(res.body).toEqual({
      code: 1011,
      message: "Wrong username or password.",
    });
  });

  test("Авторизация возвращает 412 и код ошибки 1011, если пароль неверный", async () => {
    const res = await user.login({
      username: userData.username,
      password: "invalid",
    });
    expect(res.status).toEqual(412);
    expect(res.body).toEqual({
      code: 1011,
      message: "Wrong username or password.",
    });
  });
});

describe("GET /api/v1/user", () => {
  test("Инфо о пользователе возвращает 200, если токен правильный", async () => {
    const token = await user.getAuthToken();
    const res = await user.getUserInfo(token);
    expect(res.status).toEqual(200);
  });
});
