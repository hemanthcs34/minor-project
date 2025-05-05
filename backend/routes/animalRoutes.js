const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

router.get('/', animalController.getAllAnimals);

module.exports = router;