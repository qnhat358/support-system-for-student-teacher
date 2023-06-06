const express = require('express');
const examRouter = require('./exam');
const questionRouter = require('./question');
const userRouter = require('./user');
const authRouter = require('./auth');
const verifyToken = require('../../app/middlewares/verifyToken')

const apiRouter = express.Router();


apiRouter.use('/exams', verifyToken, examRouter);
apiRouter.use('/questions', verifyToken, questionRouter);
apiRouter.use('/users', verifyToken, userRouter);
apiRouter.use('/auth', authRouter);

module.exports = apiRouter;