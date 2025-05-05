const db = require('../config/db.config');

const adoptController = {
    submitApplication: async (req, res) => {
        const { user_id, animal_id, shelter_id, reason } = req.body;
        let connection;

        try {
            connection = await db.getConnection();
            await connection.beginTransaction();

            const [result] = await connection.query(
                `INSERT INTO Adoption (user_id, animal_id, shelter_id, adoption_date, status) 
                 VALUES (?, ?, ?, CURDATE(), 'Pending')`,
                [user_id, animal_id, shelter_id]
            );

            await connection.query(
                'UPDATE Animal SET status = "Adopted" WHERE animal_id = ?',
                [animal_id]
            );

            await connection.commit();

            res.status(201).json({
                message: 'Adoption application submitted successfully',
                adoption_id: result.insertId
            });
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error in adoption submission:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            if (connection) {
                connection.release();
            }
        }
    },

    getAdoptionStatus: async (req, res) => {
        try {
            const [adoption] = await db.query(
                `SELECT a.*, u.name as user_name, an.name as animal_name 
                 FROM Adoption a 
                 JOIN User u ON a.user_id = u.user_id 
                 JOIN Animal an ON a.animal_id = an.animal_id 
                 WHERE a.adoption_id = ?`,
                [req.params.id]
            );

            if (adoption.length === 0) {
                return res.status(404).json({ message: 'Adoption record not found' });
            }

            res.json(adoption[0]);
        } catch (error) {
            console.error('Error fetching adoption status:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = adoptController;