import user from "../framework/services/user";
import config from "../framework/config";

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
