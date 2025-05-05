const db = require('../config/db.config');

const contactController = {
    submitMessage: async (req, res) => {
        try {
            const { name, email, message } = req.body;
            
            const [result] = await db.query(
                'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
                [name, email, message]
            );

            res.status(201).json({ message: 'Message sent successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = contactController;