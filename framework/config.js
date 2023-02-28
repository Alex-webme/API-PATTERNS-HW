import userData from "./helpers/genUserData";

const config = {
  url: "https://try.vikunja.io",
  credentials: {
    password: userData.password,
    username: userData.username,
  },
};

export default config;
