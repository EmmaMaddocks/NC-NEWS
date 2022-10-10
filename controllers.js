const { getAllTopics } = require('./models')

exports.fetchAllTopics = (req, res, next) => {
    getAllTopics()
    .then((topics) => {
    res.status(200).send(topics);
       // console.log(topics);
    })
    .catch(next);
}
