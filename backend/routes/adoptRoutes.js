const express = require('express');
const router = express.Router();
const adoptController = require('../controllers/adoptController');

router.post('/submit', adoptController.submitApplication);
router.get('/status/:id', adoptController.getAdoptionStatus);

module.exports = router;