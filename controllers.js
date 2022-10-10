const { getAllTopics, getArticleById } = require('./models')

exports.fetchAllTopics = (req, res, next) => {
    getAllTopics()
    .then((topics) => {
    res.status(200)
    .send(topics);
       // console.log(topics);
    })
    .catch(next);
}

exports.fetchArticleById = (req, res, next) => {
    const { article_id } = req.params;
    getArticleById(article_id)
    .then((article) => {
    res.status(200)
    .send(article[0]);
    })
    .catch(next);
}