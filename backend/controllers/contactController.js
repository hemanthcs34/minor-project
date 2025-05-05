const db = require('../config/db.config');

const contactController = {
    submitMessage: async (req, res) => {
        try {
            const { name, email, message } = req.body;
            console.log('Received contact message:', { name, email, message });

            const [result] = await db.query(
                'INSERT INTO ContactMessage (name, email, message) VALUES (?, ?, ?)',
                [name, email, message]
            );

            console.log('Message saved to database');
            res.status(200).json({ message: 'Message submitted successfully' });
        } catch (error) {
            console.error('Error submitting message:', error);
            res.status(500).json({ message: 'Error submitting message' });
        }
    }
};

module.exports = contactController;