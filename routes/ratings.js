import express from 'express';
import authorization from './authorization.js';
import fetch from 'node-fetch';

const router = express.Router();
const DB_PORT = process.env.DB_PORT;

router.patch('/answers/:answer_id', authorization, async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/answers/${req.params.answer_id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            likes: req.body.likes,
            dislikes: req.body.dislikes
        })
        }),
    res.json()
});

export default router