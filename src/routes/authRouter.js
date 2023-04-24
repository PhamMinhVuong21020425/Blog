const express = require('express');
const authController = require('../app/controllers/auth/AuthController');

const router = express.Router();

router.get('/signup', authController.signup);
router.post('/signup', authController.signPost);
router.get('/', authController.login);
router.post('/', authController.logPost);

module.exports = router;