const validateAdoption = (req, res, next) => {
    const { user_id, animal_id, shelter_id } = req.body;

    if (!user_id || !animal_id || !shelter_id) {
        return res.status(400).json({
            message: 'Missing required fields: user_id, animal_id, and shelter_id are required'
        });
    }

    next();
};

module.exports = validateAdoption;