const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/user");
const helper = require("./test-helper");
const app = require("../app");
const api = supertest(app);

describe("When there is initially 1 user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({
      username: "root",
      passwordHash,
    });
    await user.save();
  });

  test("Creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "alexdal1992",
      name: "Le Duc Anh",
      password: "qwerty123",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("Creation fails with proper status code and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "superuser",
      password: "whatever",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("Test the registration of new user", () => {
  test("Unable to create new user when username field is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { name: "lol", password: "132456" };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("Unable to create new user when username field is less than 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { username: "0", name: "lol", password: "132456" };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
