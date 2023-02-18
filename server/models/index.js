const db = require('../db');

module.exports = {
  // retireveQs: (productID) => {

  // },
  // retrieveAs: (questionID) => {

  // },
  postQ: (question) => (
    db.query(
      `INSERT INTO questions
      (product_id, question_body, question_date, asker_name, asker_email)
      VALUES (${question.product_id}, '${question.body}', ${Date.now()}, '${question.name}', '${question.email}')`,
    )
  ),
  postA: (questionID, answer) => (
    db.query(
      `INSERT INTO answers
      (question_id, answer_body, answer_date, answerer_name, answerer_email)
      VALUES (${questionID}, '${answer.body}', ${Date.now()}, '${answer.name}', '${answer.email}')`,
    )
      .then(() => {
        Promise.all(answer.photos.map((url) => (
          db.query(
            `INSERT INTO photos (answer_id, url)
            VALUES ((SELECT MAX(id) from answers), '${url}')`,
          )
        )));
      })
      .catch((err) => err)
  ),
  putQHelpful: (questionID) => (
    db.query(
      `UPDATE questions
      SET question_helpfulness = question_helpfulness + 1
      WHERE id = ${questionID}`,
    )
  ),
  putQReported: (questionID) => (
    db.query(
      `UPDATE questions
      SET reported = 1
      WHERE id = ${questionID}`,
    )
  ),
  putAHelpful: (answerID) => (
    db.query(
      `UPDATE answers
      SET answer_helpfulness = answer_helpfulness + 1
      WHERE id = ${answerID}`,
    )
  ),
  putAReported: (answerID) => (
    db.query(
      `UPDATE questions
      SET reported = 1
      WHERE id = ${answerID}`,
    )
  ),
};
