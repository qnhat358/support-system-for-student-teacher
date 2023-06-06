const express = require('express');
const router = express.Router();
const validate = require('../../app/middlewares/validate')
const { registerValidation, loginValidation } = require('../../app/validations/authValidation')
const AuthController = require('../../app/controllers/AuthController');

router.post('/register', validate(registerValidation), AuthController.register);
router.post('/login', validate(loginValidation), AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.requestRefreshToken);

module.exports = router;