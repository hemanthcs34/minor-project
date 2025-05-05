const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/submit', contactController.submitMessage);

module.exports = router;