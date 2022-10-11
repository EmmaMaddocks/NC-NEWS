const app = require("../app");
const pool = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const request = require("supertest");
const users = require("../db/data/test-data/users");

beforeEach(() => seed(testData));

afterAll(() => {
  pool.end();
});

describe("GET /api/topics endpoint", () => {
  test("Responds with an array of topic objects with a slug and description property", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        let topics = body;
        topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
        expect(topics.length).toEqual(3);
      });
  });

  test("Responds with 404 not a path error when passed bad path", () => {
    return request(app).get("/api/notapath").expect(404);
  });
});

describe("GET /api/articles/:article_id endpoint", () => {
  test("Responds with an article object", () => {
    const article_id = 2;
    return request(app)
      .get(`/api/articles/${article_id}`)
      .expect(200)
      .then(({ body }) => {
        console.log(body)
        expect(body).toMatchObject({
          article_id: article_id,
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          title: expect.any(String),
          topic: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String),
        });
      });
  });

  test("Responds with a 400 error when the id passed is invalid", () => {
    return request(app)
      .get(`/api/articles/notAnId`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad Request" });
      });
  });

  test("Responds with a 404 error when the id passed is valid but no article", () => {
    return request(app)
      .get(`/api/articles/49532`)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Resource not found");
      });
  });
});

describe("GET /api/users responds with an array of users", () => {
  test("Responds with an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        let users = body;
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
        expect(users.length).toEqual(4);
      });
  });
  test("Responds with 404 error when passed bad path", () => {
    return request(app)
    .get("/api/notapath")
    .expect(404)
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: Patch returns the updated article", () => {
    const article_id = 2;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
      });
  });
  test("Newvote updates the votes property", () => {
    const article_id = 2;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).toBe(1);
      });
  });

  test("Newvote updates the votes property", () => {
    const article_id = 2;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: -100 })
      .expect(200)
      .then(({ body }) => {
        expect(body.votes).toBe(-100);
      });
  });


test("404: Returns error message when article ID doesnt exist", () => {
  const article_id = 99999;
  return request(app)
    .patch(`/api/articles/${article_id}`)
    .send({ inc_votes: 1 })
    .expect(404)
    .then(({ body }) => {
      expect(body.message).toBe("Resource not found");
    })
});


test("404: Returns error message when invalid inc entered", () => {
  const article_id = 2;
  return request(app)
    .patch(`/api/articles/${article_id}`)
    .send({ inc_votes: 'ten' })
    .expect(400)
    .then(({ body }) => {
      expect(body.message).toBe('Could not update, please ensure you have entered a vote amount in number format');
    })
});

test("400: Returns error message when no inc amount entered", () => {
  const article_id = 2;
  return request(app)
    .patch(`/api/articles/${article_id}`)
    .send({ inc_votes: '' })
    .expect(400)
    .then(({ body }) => {
      expect(body.message).toBe('Could not update, please ensure you have entered a vote amount in number format');
    })
});

});
