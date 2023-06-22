const express = require("express");
const router = express.Router();
const validate = require("../../app/middlewares/validate");
const {
  updateUserInfoValidation,
} = require("../../app/validations/userValidation");
const userController = require("../../app/controllers/UserController");

router.get("/", userController.index);
router.get("/:id", userController.getUser);
router.put("/:id", validate(updateUserInfoValidation), userController.update);

module.exports = router;
