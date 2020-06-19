const request = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "Bill",
  email: "Bill@example.com",
  password: "B!ll123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }
  ]
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should sign up new users", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "David",
      email: "David@Bowie.com",
      password: "Z!ggy123"
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "David",
      email: "david@bowie.com"
    },
    token: user.tokens[0].token
  });

  expect(response.body.password).not.toBe("Z!ggy123");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login if bad credentials", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "fake@McFake.com",
      password: "BadCredentials123!"
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for unauth user", async () => {
  await request(app)
    .get("/user/me")
    .send()
    .expect(404);
});

test("should delete account for auth user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("shOuld not delete account for unauth user", async () => {
  await request(app)
    .delete("/user/me")
    .send()
    .expect(404);
});
