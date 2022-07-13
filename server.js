import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const BACK_PORT = process.env.BACK_PORT;
const DB_PORT = process.env.DB_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/questions', async (req, res) => {
    const questions = await fetch(`http://localhost:${DB_PORT}/questions`)
        .then(questions => questions.json());
    res.json(questions) 
});

app.post('/api/questions', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/questions`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
        }),
    res.json()
});

app.patch('/api/questions/:question_id', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/questions/${req.params.question_id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(req.body)
        }),
    res.json()
});

app.delete('/api/questions/:question_id', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/questions/${req.params.question_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(req.body)
        }),
    res.json()
});

app.get('/api/questions/:question_id/answers', async (req, res) => {
    const allAnswers = await fetch(`http://localhost:${DB_PORT}/answers`)
        .then(allAnswers => allAnswers.json());
    const answers = allAnswers.filter(answer => answer.question_id == `${req.params.question_id}`)
    res.json(answers) 
});

app.post('/api/questions/:question_id/answers', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/answers`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
        }),
    res.json()
});

app.patch('/api/answers/:answer_id', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/answers/${req.params.answer_id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(req.body)
        }),
    res.json()
});

app.delete('/api/answer/:answer_id', async (req, res) => {
    fetch(`http://localhost:${DB_PORT}/answers/${req.params.answer_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        body : JSON.stringify(req.body)
        }),
    res.json()
});

app.listen(BACK_PORT, () => console.log(`Server is running on PORT ${BACK_PORT}`))