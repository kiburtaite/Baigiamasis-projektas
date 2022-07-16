import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const DB_PORT = process.env.DB_PORT;

router.get('/questions', async (req, res) => {
    const questions = await fetch(`http://localhost:${DB_PORT}/questions`)
        .then(questions => questions.json());
    res.json(questions) 
});

router.post('/questions', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/questions`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
        }),
    res.json()
});

router.patch('/questions/:question_id', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/questions/${req.params.question_id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(req.body)
        }),
    res.json()
});

router.delete('/questions/:question_id', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/questions/${req.params.question_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(req.body)
        }),
    res.json()
});

router.get('/answers', async (req, res) => {
    const answers = await fetch(`http://localhost:${DB_PORT}/answers`)
        .then(answers => answers.json());
    res.json(answers) 
});

router.get('/questions/:question_id/answers', async (req, res) => {
    const allAnswers = await fetch(`http://localhost:${DB_PORT}/answers`)
        .then(allAnswers => allAnswers.json());
    const answers = allAnswers.filter(answer => answer.question_id == `${req.params.question_id}`)
    res.json(answers) 
});

router.post('/questions/:question_id/answers', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/answers`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
        }),
    res.json()
});

router.patch('/answers/:answer_id', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/answers/${req.params.answer_id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(req.body)
        }),
    res.json()
});

router.delete('/answers/:answer_id', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/answers/${req.params.answer_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(req.body)
        }),
    res.json()
});

export default router