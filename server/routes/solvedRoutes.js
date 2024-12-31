const express = require('express');
const router = express.Router();
const Question = require('../models/Question'); // Replace with your schema/model

// Update solved status
router.post('/updateSolved', async (req, res) => {
    try {
        const { questionTitle, solved } = req.body;
        const updatedQuestion = await Question.findOneAndUpdate(
            { title: questionTitle },
            { solved },
            { new: true, upsert: true } // Upsert creates a new record if it doesn't exist
        );
        res.status(200).json({ success: true, data: updatedQuestion });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
