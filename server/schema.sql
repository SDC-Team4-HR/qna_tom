-- ---
-- Database 'sdc_qna'
-- ---
-- DROP DATABASE IF EXISTS sdc_qna;
-- CREATE DATABASE sdc_qna;

-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id SERIAL,
  question_body TEXT NOT NULL,
  question_date TIMESTAMP NOT NULL,
  asker_name VARCHAR(255) NOT NULL,
  asker_email VARCHAR(255) NOT NULL,
  question_helpfulness INTEGER DEFAULT 0,
  reported BOOLEAN DEFAULT FALSE,
  product_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'answers'
--
-- ---

DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id SERIAL,
  answer_body TEXT NOT NULL,
  answer_date TIMESTAMP NOT NULL,
  answerer_name VARCHAR(255) NOT NULL,
  answerer_email VARCHAR(255) NOT NULL,
  answer_helpfulness INTEGER DEFAULT 0,
  reported BOOLEAN DEFAULT FALSE,
  question_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL,
  url VARCHAR(255) NOT NULL,
  answer_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE answers ADD FOREIGN KEY (question_id) REFERENCES questions (id);
ALTER TABLE photos ADD FOREIGN KEY (answer_id) REFERENCES answers (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- BATCH FILE
-- ---
-- psql -U tjspitz -d sdc_qna -a -f server/schema.sql