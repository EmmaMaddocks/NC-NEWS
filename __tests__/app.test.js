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

  test("200 allows client to filter by topic and sort by a specific column in chosen order", () => {
    return request(app)
      .get("/api/articles?topic=mitch&sort_by=votes&order=ASC")
      .expect(200)
      .then(({ body }) => {
        let articles = body;
        expect(articles.length).toEqual(11);
        expect(articles).toBeSortedBy("votes", {
          ascending: true,
        });
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });

  
  test("404 'topic not found' when no articles for requested topic", () => {
    return request(app)
      .get("/api/articles?topic=dogs")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Topic not found");
      });
  });

  test("400 'Invalid sort query' if sort_by column doesn't exist", () => {
    return request(app)
      .get("/api/articles?topic=mitch&sort_by=invalid")
      .expect(400)
      .then(({body}) => {
        expect(body.message).toBe("Invalid sort query");
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


describe('/api/comments/:comment_id', () => {
		test('204: deletes comment associated with passed comment_id and returns no content', () => {
			return request(app)
      .delete('/api/comments/1')
      .expect(204);
		});

		test('404 Comment not found when passed an ID that is valid but doesnt exist', () => {
			return request(app)
      .delete("/api/comments/9000")
      .expect(404)
      .then(({body}) => {
        expect(body.message).toBe("Comment not found");
      });
		});

		test('400 Bad request if an invalid comment_id is passed', () => {
			return request(app)
				.delete('/api/comments/notAValidID')
				.expect(400)
				.then(({body}) => {
					expect(body.msg).toBe('Bad Request');
				});
});
});





describe('returns api', () => {
	test('api is returned', () => {
		return request(app)
			.get('/api')
			.expect(200)
			.then((response) => {
				expect(response.body.endpoints).toEqual({"GET /api": {
          "description": "serves up a json representation of all the available endpoints of the api"
        },
        "GET /api/topics": {
          "description": "serves an array of all topics",
          "queries": [],
          "exampleResponse": {
            "topics": [
              { "slug": "coding", "description": "Code is love, code is life!" }
            ]
          }
        },
        "GET /api/articles": {
          "description": "serves an array of all articles that can be filtered and ordered through queries",
          "queries": ["topic", "sort_by", "order"],
          "exampleResponse": {
            "articles": [
              {
                "title": "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
                "topic": "coding",
                "author": "jessjelly",
                "body": "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
                "created_at": 1589418120000,
                "votes": 0
              }
            ]
          }
        },
        "GET /api/articles/:article_id": {
          "description": "serves the article associated with the article id passed ",
          "queries": [],
          "exampleResponse": {
            "article_id": 1,
            "title": "Making sense of Redux",
            "topic": "coding",
            "author": "jessjelly",
            "body": "When I first started learning React, I remember reading lots of articles about the different technologies associated with it. In particular, this one article stood out. It mentions how confusing the ecosystem is, and how developers often feel they have to know ALL of the ecosystem before using React. And as someone who’s used React daily for the past 8 months or so, I can definitely say that I’m still barely scratching the surface in terms of understanding how the entire ecosystem works! But my time spent using React has given me some insight into when and why it might be appropriate to use another technology — Redux (a variant of the Flux architecture).",
            "created_at": 1599858720000,
            "comment_count": 4,
            "votes": 0
          }
        },
        "GET /api/articles/:article_id/comments": {
          "description": "serves all comments associated with passed article ID",
          "queries": [],
          "exampleResponse": [
            {
              "comment_id": 1,
              "body": "Qui sunt sit voluptas repellendus sed. Voluptatem et repellat fugiat. Rerum doloribus eveniet quidem vero aut sint officiis. Dolor facere et et architecto vero qui et perferendis dolorem. Magni quis ratione adipisci error assumenda ut. Id rerum eos facere sit nihil ipsam officia aspernatur odio.",
              "votes": 3,
              "author": "grumpy19",
              "created_at": 1600820280000
            },
            {
              "comment_id": 2,
              "body": "Rerum voluptatem quam odio facilis quis illo unde. Ex blanditiis optio tenetur sunt. Cumque dolor ducimus et qui officia quasi non illum reiciendis.",
              "votes": 3,
              "author": "happyamy2016",
              "created_at": 1602370980000
            }
          ]
        },
        "GET /api/users": {
          "description": "serves an array of users with their username, name and avatar url ",
          "queries": [],
          "exampleResponse": [
            {
              "username": "butter_bridge",
              "name": "jonny",
              "avatar_url": "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
            },
            {
              "username": "icellusedkars",
              "name": "sam",
              "avatar_url": "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4"
            }
          ]
        },
        "PATCH /api/articles/:article_id": {
          "description": "takes a request body and serves a response of the article with an updated vote count",
          "queries": [],
          "exampleResponse": {
            "article_id": 7,
            "title": "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
            "topic": "coding",
            "author": "jessjelly",
            "body": "Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.",
            "created_at": 1589418120000,
            "votes": 100
          }
        },
        "POST /api/articles/:article_id/comments": {
          "description": "takes a request body and responds with a comment object that has been added to the database",
          "queries": [],
          "exampleResponse": {
            "comment_id": 5,
            "body": "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            "votes": 6,
            "author": "tickle122",
            "created_at": 1590103140000
          }
        },
        "DELETE /api/comments/:comment_id": {
          "description": "deletes the comment associated with the passed comment_id and returns a 204 status code with no response body",
          "queries": []
        }
        });
      });
    });
  })

  describe("POST /api/articles", () => {
    test("Request body takes a user and body and returns the posted article", () => {
      const newArticle = {
        title: "This is a new article",
        body: "This is the body of the new article",
        topic: "cats",
        author: "lurker",
      };
      return request(app)
        .post("/api/articles")
        .send(newArticle)
        // .expect(201)
        .then(res => {
          expect(res.body.article).toEqual({
            ...newArticle,
            article_id: 13,
            votes: 0,
            created_at: expect.any(String)
          });
        });
    });
  })
  

  describe('/api/articles/:article_id', () => {
		test('204: deletes article associated with passed article_id and returns no content', () => {
			return request(app)
      .delete('/api/articles/2')
      .expect(204);
		});
  })