import express from 'express';
import { FRONTEND_URL, PORT } from './config/env';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'welcome to shop sphere!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
