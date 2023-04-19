const express = require('express');
const searchController = require('../app/controllers/SearchController');

const router = express.Router();

router.get('/', searchController.searchGet);
router.post('/', searchController.searchPost);

module.exports = router;