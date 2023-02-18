// need: dotenv, express, path, morgan, cors
require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

// convenience
const { SV_PORT } = process.env;

// give 'app' express' functionality
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// try this out here before MVC
const db = require('./db');

// List Questions for given product ID
// app.get('/qa/questions', (req, res) => {
//   // prep req.query
//   let { product_id, page, count } = req.query;

//   page = page || 1;
//   count = count || 5;
//   // query db for questions
//   // com
//   db.query(

//   );
// });

// List Answers for given question
// app.get('qa/questions/:question_id/answers', req, res => {

//   db.query(
//     `SELECT `
//   );
// });

// Add a Question for given product ID
app.post('/qa/questions', (req, res) => {
  const {
    body, name, email, product_id,
  } = req.body;
  db.query(
    `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email)
    VALUES (${product_id}, '${body}', ${Date.now()}, '${name}', '${email}')`,
  )
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Add an Answer for given question ID
app.post('/qa/questions/:question_id/answers', (req, res) => {

});

// Mark Question as Helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const { question_id } = req.params;
  db.query(
    `UPDATE questions
    SET question_helpfulness = question_helpfulness + 1
    WHERE id = ${question_id}`,
  )
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err));
});

// Report Question
app.put('/qa/questions/:question_id/report', (req, res) => {
  const { question_id } = req.params;
  db.query(
    `UPDATE questions
    SET reported = 1
    WHERE id = ${question_id}`,
  )
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(500).send(err));
});

// serve static assets from front-end
// app.use(express.static(path.join(__dirname, '../client/dist')));

// listen on a port that's different from db
app.listen(SV_PORT);
console.log(`Server is listening at http://localhost:${SV_PORT}`);
