const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.submitMessage); // Make sure this is router.post

module.exports = router;