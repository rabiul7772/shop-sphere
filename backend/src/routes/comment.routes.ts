import { Router } from 'express';
import {
  createComment,
  deleteComment,
  getCommentById,
  updateComment
} from '../controllers/comment.controller';
import { requireAuth } from '@clerk/express';

const commentRouter = Router();

commentRouter.post('/:productId', requireAuth(), createComment);

commentRouter.delete('/:commentId', requireAuth(), deleteComment);

commentRouter.get('/:commentId', getCommentById);

commentRouter.put('/:commentId', requireAuth(), updateComment);

export default commentRouter;
