const db = require('../db');

module.exports = {
  // retrieveQs: (productID, query) => (
  //
  // ),
  retrieveAs: (questionID, query) => (
    db.query(
      `SELECT json_build_object(
        'question', (SELECT id from questions WHERE id=${questionID})::text,
        'page', ${query.page},
        'count', ${query.count},
        'results', (SELECT json_agg(row_to_json(answers))
          FROM (
            SELECT
              a.id AS answer_id,
              a.answer_body AS body,
              (SELECT to_char(to_timestamp(a.answer_date/1000), 'YYYY-MM-DD"T"HH24:MI:SS.MSZ')) AS date,
              a.answerer_name,
              a.answer_helpfulness AS helpfulness,
              json_agg(json_strip_nulls(json_build_object(
                'id', p.id,
                'url', p.url
              ))) AS photos
            FROM answers a
            LEFT JOIN photos p ON a.id = p.answer_id
            WHERE question_id=${questionID} AND reported=false
            GROUP BY a.id
            LIMIT ${query.count} OFFSET ${query.page}
          ) answers
        )
      )`,
    )
  ),
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
