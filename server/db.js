/* eslint-disable import/no-extraneous-dependencies */
// sql w/ postgres
// const { Client } = require('pg');
const { Pool } = require('pg');

// convenience
const {
  PG_USER, PG_HOST, PG_DB,
  PG_PORT, PG_PASSWORD,
} = process.env;

// using CLIENT
// const db = new Client({
//   user: PG_USER,
//   host: PG_HOST,
//   database: PG_DB,
//   port: PG_PORT,
//   password: PG_PASSWORD,
// });

// using POOL
const db = new Pool({
  user: PG_USER,
  host: PG_HOST,
  database: PG_DB,
  port: PG_PORT,
  password: PG_PASSWORD,
  max: 20,
});

db.connect()
  .then(() => db.query('SELECT NOW()'))
  .then(() => {
    console.log(`Successful connection to postgreSQL on port: ${PG_PORT}`);
  })
  .catch((err) => console.log(`Connection err: ${err.stack}`));

module.exports = db;

// mongoDB w/ mongoose
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://FILL_ME_IN', { useNewUrlParser: true, useUnifiedTopology: true });

// const questionsSchema = new mongoose.Schema({
//   _id: { type: Number, unique: true }, // this is question_id?
//   question_body: { type: String, lowercase: true, trim: true },
//   question_date: { type: Date },
//   asker_name: { type: String, lowercase: true, trim: true },
//   question_helpfulness: { type: Number, default: 0 },
//   reported: { type: Boolean, default: false },
//   product_id: { type: Number },
// });

// const answersSchema = new mongoose.Schema({
//   _id: { type: Number, unique: true }, // this is answer_id?
//   answer_body: { type: String, lowercase: true, trim: true },
//   answer_date: { type: Date },
//   answerer_name: { type: String, lowercase: true, trim: true },
//   email: { type: String, lowercase: true, trim: true },
//   answer_helpfulness: { type: Number, default: 0 },
//   reported: { type: Boolean, default: false },
//   question_id: { type: Number }, // reference a Question's _id
//   photos: [
//     { id: Number, url: String },
//   ],
// });

// const Question = mongoose.model('Question', questionsSchema);
// const Answer = mongoose.model('Answer', answersSchema);
