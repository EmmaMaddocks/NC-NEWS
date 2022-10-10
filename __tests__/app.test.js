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


describe("GET /api/articles/:article_id endpoint", () => {
    test('Responds with an article object', () => {
        const article_id = 2;
        return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then((response) => {
            expect(response.body).toMatchObject({
              article_id: article_id,
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              title: expect.any(String),
              topic: expect.any(String),
              votes: expect.any(Number)
            })
          });
    })
    test('Responds with an empty object when the id passed is valid but has no article', () => {
        const article_id = 2292943;
        return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({});
          });
    })
    test('Responds with a 404 error  when the id passed is invalid', () => {
        return request(app)
        .get(`/api/articles/notAnId`)
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual({"msg": "Bad Request"});
          });
    })
})

describe('GET /api/users responds with an array of users', () => {
    test('', () => {

    })

})