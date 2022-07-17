import express from 'express';
import fetch from 'node-fetch';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const DB_PORT = process.env.DB_PORT;

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    const allUsers = await fetch(`http://localhost:${DB_PORT}/users`)
    .then(data => data.json());
    const loginUser = allUsers.find(user => user.email === req.body.email);
    if (await bcrypt.compare(req.body.password, loginUser.password)){
        const token = jwt.sign({
            "user_id": loginUser.id
        }, process.env.KEY);
        res.status(200).json({
            token: token,
            user_id: loginUser.id
        })
    } else res.status(401).send()
});

export default router