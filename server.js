import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const BACK_PORT = process.env.BACK_PORT;
const DB_PORT = process.env.DB_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/register', async (req, res) => {
    const allUsers = await fetch(`http://localhost:${DB_PORT}/users`)
    .then(data => data.json());
    const usernameCheck = allUsers.some(user => user.username === req.body.username);
    const emailCheck = allUsers.some(user => user.email === req.body.email);
    if (usernameCheck || emailCheck){
        res.status(409).send()
    } else {
        const newUser = {
            id: uuid(),
            username: req.body.username,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 5)
        };
        fetch(`http://localhost:${DB_PORT}/users`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
            }),
        res.json()
    }
});

app.post('/login', async (req, res) => {
    const allUsers = await fetch(`http://localhost:${DB_PORT}/users`)
    .then(data => data.json());
    const loginUser = allUsers.find(user => user.email === req.body.email);
    if (await bcrypt.compare(req.body.password, loginUser.password)){
        const token = jwt.sign({
            "user_id": loginUser.id
        }, process.env.KEY);
        return res.cookie('token', token, {
            httpOnly: true
        })
        .status(200).send()
    } else res.status(401).send()
});

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

app.get('/api/answers', async (req, res) => {
    const answers = await fetch(`http://localhost:${DB_PORT}/answers`)
        .then(answers => answers.json());
    res.json(answers) 
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

app.delete('/api/answers/:answer_id', async (req, res) => {
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