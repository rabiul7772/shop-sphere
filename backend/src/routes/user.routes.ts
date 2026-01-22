import { requireAuth } from '@clerk/express';
import { Router } from 'express';
import { syncUser } from '../controllers/user.controller';

const userRouter = Router();

//   /api/v1/users/sync > sync clerk userId to database [PROTECTED]

userRouter.post('/sync', requireAuth(), syncUser);

export default userRouter;
