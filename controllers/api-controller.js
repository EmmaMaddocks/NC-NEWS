exports.getApi = (req, res, next) => {
	res.status(200).send({
		endpoints: {
            "GET /api": {
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
            },   
          "GET /api/users/:username": {
            "description": "serves an object containing the given username properties",
            "queries": [],
            "exampleResponse": {
              "user": {
                "username": "jessjelly",
                "avatar_url": "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
                "name": "Jess Jelly"
              }
            }
          },
          "POST /api/articles": {
            "description": "post a new article when passed a valid article object",
            "queries": [],
            "exampleResponse": {
              "status": 204
            },
        },
        "DELETE /api/articles/:article_id": {
          "description": "deletes the article associated with the passed article_id and returns a 204 status code with no response body",
          "queries": []
        }
    }
  }
  )};
    