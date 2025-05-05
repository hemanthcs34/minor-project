const express = require('express');
const router = express.Router();
const rescueController = require('../controllers/rescueController');

router.get('/', rescueController.getAllStories);
router.post('/add', rescueController.addStory);

module.exports = router;