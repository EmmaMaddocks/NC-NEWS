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
        expect(body).toMatchObject({
          article_id: article_id,
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          title: expect.any(String),
          topic: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(Number),
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
        expect(users.length).toEqual(4);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
  test("Responds with 404 error when passed bad path", () => {
    return request(app).get("/api/notapath").expect(404);
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
      });
  });

  test("404: Returns error message when invalid inc entered", () => {
    const article_id = 2;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: "ten" })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe(
          "Could not update, please ensure you have entered a vote amount in number format"
        );
      });
  });

  test("400: Returns error message when no inc amount entered", () => {
    const article_id = 2;
    return request(app)
      .patch(`/api/articles/${article_id}`)
      .send({ inc_votes: "" })
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe(
          "Could not update, please ensure you have entered a vote amount in number format"
        );
      });
  });
});

describe("GET /api/articles", () => {
  test("responds with an array of articles in descending date order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        let articles = body;
        expect(articles.length).toEqual(12);
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              title: expect.any(String),
              topic: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
        expect(articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

  test("200 allows client to filter by topic", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        let articles = body;
        expect(articles.length).toEqual(11);
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });

  test("404 error no resources found when no articles for requested topic", () => {
    return request(app)
      .get("/api/articles?topic=dogs")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Resource not found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("responds with an array of comments in order of newest-oldest for the given article id", () => {
    const article_id = 1;
    return request(app)
      .get(`/api/articles/${article_id}/comments`)
      .expect(200)
      .then(({ body }) => {
        let comments = body;
        comments.forEach((comment) => {
          expect.objectContaining({
            body: expect.any(String),
            votes: expect.any(String),
            author: expect.any(String),
            article_id: expect.any(Number),
            created_at: expect.any(Number),
          });
        });
        expect(comments.length).toEqual(11);
        expect(comments).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });

  test("Responds with a 400 error when the id passed is invalid", () => {
    return request(app)
      .get(`/api/articles/notAnId/comments`)
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Bad Request" });
      });
  });

  test("Responds with a 404 error when the id passed is valid but no article", () => {
    return request(app)
      .get(`/api/articles/49532/comments`)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual("Resource not found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("Request body takes a user and body and returns the posted comment", () => {
    const newComment = {
      username: "icellusedkars",
      body: "This is an amazing comment.",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        expect(body).toEqual({
          comment_id: 19,
          body: "This is an amazing comment.",
          article_id: 2,
          author: "icellusedkars",
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });

  test("400 - missing required fields", () => {
    const newComment = {
      username: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual(
          "Please enter a comment"
        );
      });
  });

  test("404 - username does not exist", () => {
    const newComment = {
      username: "emmaMadd",
      body: "This is an amazing comment."
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toEqual(
          "User not found"
        );
      });
  });
});
