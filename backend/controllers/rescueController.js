const db = require('../config/db.config');

const rescueController = {
    getAllStories: async (req, res) => {
        try {
            const [stories] = await db.query('SELECT * FROM rescue_stories ORDER BY rescue_date DESC');
            res.json(stories);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addStory: async (req, res) => {
        try {
            const { title, story, rescue_date, animal_id, image_url } = req.body;
            
            const [result] = await db.query(
                'INSERT INTO rescue_stories (title, story, rescue_date, animal_id, image_url) VALUES (?, ?, ?, ?, ?)',
                [title, story, rescue_date, animal_id, image_url]
            );

            res.status(201).json({ message: 'Story added successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = rescueController;