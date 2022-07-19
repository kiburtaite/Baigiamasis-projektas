import express from 'express';
import authorization from './authorization.js';
import fetch from 'node-fetch';
import { v4 as uuid } from 'uuid';

const router = express.Router();
const DB_PORT = process.env.DB_PORT;

router.get('/ratings', async (req, res) => {
    const ratings = await fetch(`http://localhost:${DB_PORT}/ratings`)
        .then(data => data.json());
    res.json(ratings) 
});

router.post('/ratings', authorization, async (req, res) => {
    const newRating = {
        id: uuid(),
        user_id: req.body.user_id,
        answer_id: req.body.answer_id,
        type: req.body.type
    };
    fetch(`http://localhost:${DB_PORT}/ratings`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRating)
        }),
    res.json()
});

router.delete('/ratings/:rating_id', authorization, async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/ratings/${req.params.rating_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
        }),
    res.json()
});

export default router