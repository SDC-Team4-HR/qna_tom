// sql w/ postgres

// mongoDB w/ mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://FILL_ME_IN', { useNewUrlParser: true, useUnifiedTopology: true });

const questionsSchema = new mongoose.Schema({
  _id: { type: Number }, // is autogenerated (int unique auto-inc) this is question_id?
  question_body: { type: String, lowercase: true, trim: true },
  question_date: { type: Date },
  asker_name: { type: String, lowercase: true, trim: true },
  question_helpfulness: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
  product_id: { type: Number },
});

const answersSchema = new mongoose.Schema({
  _id: { type: Number }, // is autogenerated (int unique auto-inc) // this is answer_id?
  answer_body: { type: String, lowercase: true, trim: true },
  answer_date: { type: Date },
  answerer_name: { type: String, lowercase: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  answer_helpfulness: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
  question_id: { type: Number }, // reference a Question's _id
  photos: [
    { id: Number, url: String },
  ],
});

const Question = mongoose.model('Question', questionsSchema);
const Answer = mongoose.model('Answer', answersSchema);
