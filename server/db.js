// sql w/ postgres
const { Client } = require('pg');

// convenience
const {
  USER, HOST, DB, DB_PORT,
} = process.env;

const db = new Client({
  user: USER,
  host: HOST,
  database: DB,
  port: DB_PORT,
});

db.connect()
  .then(() => db.query('SELECT NOW()'))
  .then((timestamp) => {
    console.log(`Successful connection to postgreSQL at ${timestamp}`);
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
