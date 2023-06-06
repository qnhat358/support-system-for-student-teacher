const express = require('express');
const router = express.Router();
const userController = require('../../app/controllers/UserController');

router.get('/', userController.index);
router.get('/:id', userController.getUser);

module.exports = router;