import express from 'express';
import authorization from './authorization.js';
import fetch from 'node-fetch';
import { v4 as uuid } from 'uuid';

const router = express.Router();
const DB_PORT = process.env.DB_PORT;

router.get('/questions', async (req, res) => {
    const questions = await fetch(`http://localhost:${DB_PORT}/questions`)
        .then(data => data.json());
    res.json(questions) 
});

router.post('/questions', authorization, async (req, res) => {
    const newQuestion = {
        id: uuid(),
        date: new Date().toISOString().slice(0, 10),
        user_id: req.body.user_id,
        title: req.body.title,
        text: req.body.text,
        edited: false
    };
    fetch(`http://localhost:${DB_PORT}/questions`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newQuestion)
        }),
    res.json()
});

router.patch('/questions/:question_id', authorization, async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/questions/${req.params.question_id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: req.body.title,
            text: req.body.text,
            edited: true
        })
        }),
    res.json()
});

router.delete('/questions/:question_id', authorization, async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/questions/${req.params.question_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
        }),
    res.json()
});

router.get('/answers', async (req, res) => {
    const answers = await fetch(`http://localhost:${DB_PORT}/answers`)
        .then(data => data.json());
    res.json(answers) 
});

router.get('/questions/:question_id/answers', async (req, res) => {
    const allAnswers = await fetch(`http://localhost:${DB_PORT}/answers`)
        .then(allAnswers => allAnswers.json());
    const answers = allAnswers.filter(answer => answer.question_id == `${req.params.question_id}`)
    res.json(answers) 
});

router.post('/questions/:question_id/answers', authorization, async (req, res) => {
    const newAnswer = {
        id: uuid(),
        date: new Date().toISOString().slice(0, 10),
        user_id: req.body.user_id,
        question_id: req.body.question_id,
        text: req.body.text,
        edited: false
    };
    fetch(`http://localhost:${DB_PORT}/answers`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnswer)
        }),
    res.json()
});

router.patch('/answers/:answer_id', authorization, async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/answers/${req.params.answer_id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: req.body.text,
            edited: true
        })
        }),
    res.json()
});

router.delete('/answers/:answer_id', authorization, async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/answers/${req.params.answer_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
        }),
    res.json()
});

export default router