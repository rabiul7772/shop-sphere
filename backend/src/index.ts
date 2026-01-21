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
  res.json({
    message:
      'welcome to shop sphere build with postgresql, expressjs, typescript & clerk!',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      comments: '/api/comments'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
