const express = require('express');
const router = express.Router();
const validate = require('../../app/middlewares/validate')
const { createExamValidation } = require('../../app/validations/examValidation')
const authenticateRole = require('../../app/middlewares/authenUser')
const examController = require('../../app/controllers/ExamController');

router.get('/', examController.index);
router.post('/create', validate(createExamValidation), authenticateRole(['admin', 'teacher']), examController.create);
router.get('/getByUserId/:id', examController.getByUserId);
router.get('/getDetailById/:id', examController.getDetailById);
module.exports = router;