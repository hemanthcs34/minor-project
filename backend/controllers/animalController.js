const db = require('../config/db.config');

const animalController = {
    getAllAnimals: async (req, res) => {
        try {
            const [animals] = await db.query('SELECT * FROM Animal WHERE status = "Available"');
            console.log('Fetched animals:', animals);
            res.json(animals);
        } catch (error) {
            console.error('Error fetching animals:', error);
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = animalController;