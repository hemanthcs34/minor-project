const db = require('../config/db.config');

const userController = {
    createUser: async (req, res) => {
        try {
            const { name, email, phone } = req.body;
            console.log('Received user data:', { name, email, phone }); // Log the received data

            const [result] = await db.query(
                'INSERT INTO User (name, email, phone) VALUES (?, ?, ?)',
                [name, email, phone]
            );

            const user_id = result.insertId;
            console.log('Created user with ID:', user_id); // Log the created user ID

            res.status(201).json({ user_id, message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error); // Log the error
            res.status(500).json({ message: 'Error creating user' });
        }
    }
};

module.exports = userController;