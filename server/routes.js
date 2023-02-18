const router = require('express').Router();
const controller = require('./controllers');

router.get('/qa/questions', controller.getQuestions);
router.get('/qa/questions/:question_id/answers', controller.getAnswers);

router.post('/qa/questions', controller.postOneQuestion);
router.post('/qa/questions/:question_id/answers', controller.postOneAnswer);

router.put('/qa/questions/:question_id/helpful', controller.markQHelpful);
router.put('/qa/questions/:question_id/report', controller.markQReported);
router.put('/qa/answers/:answer_id/helpful', controller.markAHelpful);
router.put('/qa/answers/:answer_id/report', controller.markAReported);

module.exports = router;
