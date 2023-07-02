const express = require("express");
const router = express.Router();
const validate = require("../../app/middlewares/validate");
const {
  createExamValidation,
  updateExamValidation,
} = require("../../app/validations/examValidation");
const authenticateRole = require("../../app/middlewares/authenUser");
const resultController = require("../../app/controllers/ResultController"); 

router.get("/users", resultController.getByUserId);
router.get("/exams/:id", resultController.getByExamId);
router.get("/:id", resultController.getDetailById);

module.exports = router;
