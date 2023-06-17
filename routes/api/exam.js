const express = require('express');
const router = express.Router();
const validate = require('../../app/middlewares/validate')
const { createExamValidation } = require('../../app/validations/examValidation')
const authenticateRole = require('../../app/middlewares/authenUser')
const examController = require('../../app/controllers/ExamController');

router.get('/', examController.index);
router.post('/create', validate(createExamValidation), authenticateRole(['admin', 'teacher']), examController.create);
router.get('/getByUserId/:id', examController.getByUserId);
router.get('/public', examController.getPublic);
router.get('/getDetailById/:id', examController.getDetailById);
router.get('/getById/:id', examController.getById);
router.get('/:id/questions', examController.getQuestionByExamId);
router.get('/join/:id', examController.join);
router.post('/submit', examController.submit);
module.exports = router;