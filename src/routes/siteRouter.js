const express = require('express');
const siteController = require('../app/controllers/SiteController');

const router = express.Router();

router.get('/', siteController.home);

router.get('/users/:userID', siteController.users);

router.post('/deleteUser', siteController.deleteUser);

router.get('/plans', siteController.testPlane);
router.post('/plans', siteController.postPlane);

module.exports = router;