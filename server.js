import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import users from './routes/users.js';
import posts from './routes/posts.js';
import ratings from './routes/ratings.js';

const app = express();
const BACK_PORT = process.env.BACK_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', users);
app.use('/posts', posts);
app.use('/ratings', ratings);

app.listen(BACK_PORT, () => console.log(`Server is running on PORT ${BACK_PORT}`))