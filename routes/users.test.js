// testing end point using SuperTest
const db = require("../db");
const app = require("../app");
const supertest = require("supertest");
const request = supertest(app);

// Test to check if we get an array of users back
describe("GET /users", () => {
  it("should return all an array or users", async () => {
    const response = await request.get("/users");
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });
});

describe("GET /users/:id", () => {
  it("should return user object", async () => {
    const response = await request.get("/users/participantview@gmail.com");
    console.log(response.body.data);
    expect(response.status).toBe(200);
    expect(response.body.data).toMatchObject({
      id: 56,
      uuid: "8a6a31b4-1a6c-482a-bcfc-51cdba6bad10",
      bootcamperid: "1287",
      firstname: "Participant",
      surname: "View",
      role: "bootcamper",
      cohortno: 4,
      email: "participantview@gmail.com",
    });
    afterAll(async () => {
      await db.close();
      await app.close();
    });
  });
});
