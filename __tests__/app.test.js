const app = require("../app");
const pool = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const request = require("supertest");

beforeEach(() => seed(testData));

afterAll(() => {
  pool.end();
});

describe("GET /api/topics endpoint", () => {
  test("Responds with an array of topic objects with a slug and description property", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        topics = response.body;
        //onsole.log(response.body)
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
        expect(topics.length).toEqual(3);
        expect(topics[0].slug).toEqual("mitch");
      });
  });
});
