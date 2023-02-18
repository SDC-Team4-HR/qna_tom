const models = require('../models');

module.exports = {
  getQuestions: (req, res) => {
    models.retrieveQs(req.query)
      .then((list) => res.status(200).send(list.data))
      .catch((err) => res.status(500).send(err));
  },

  getAnswers: (req, res) => {
    models.retrieveAs(req.query)
      .then((list) => res.status(200).send(list.data))
      .catch((err) => res.status(500).send(err));
  },

  postOneQuestion: (req, res) => {
    models.postQ(req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err));
  },

  postOneAnswer: (req, res) => {
    models.postA(req.params.question_id, req.body)
      .then(() => res.sendStatus(201))
      .catch((err) => res.status(500).send(err));
  },

  markQHelpful: (req, res) => {
    models.putQHelpful(req.params.question_id)
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err));
  },

  markQReported: (req, res) => {
    models.putQReported(req.params.question_id)
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err));
  },

  markAHelpful: (req, res) => {
    models.putAHelpful(req.params.answer_id)
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err));
  },

  markAReported: (req, res) => {
    models.putAReported(req.params.answer_id)
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(500).send(err));
  },
};
