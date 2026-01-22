import type { Request, Response } from 'express';

import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { productId } = req.params as { productId: string };
    const { content } = req.body;

    if (!productId || !content)
      return res.status(400).json({ error: 'Missing required fields' });

    // verify product exists
    const product = await queries.getProductById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const comment = await queries.createComment({
      productId,
      content,
      userId
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment', error);
    res
      .status(500)
      .json({ error: 'Internal server error while creating the comment' });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { commentId } = req.params as { commentId: string };
    if (!commentId)
      return res.status(400).json({ error: 'Comment ID is required' });

    const comment = await queries.getCommentById(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (userId !== comment.userId)
      return res
        .status(401)
        .json({ error: 'You are not authorized to update this comment' });

    const { content, productId } = req.body;

    if (!content || !productId)
      return res.status(400).json({ error: 'Missing required fields' });

    const updatedComment = await queries.updateComment(commentId, {
      content,
      userId,
      productId
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error('Error updating comment', error);
    res
      .status(500)
      .json({ error: 'Internal server error while updating the comment' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { commentId } = req.params as { commentId: string };
    if (!commentId)
      return res.status(400).json({ error: 'Comment ID is required' });

    const comment = await queries.getCommentById(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    if (userId !== comment.userId)
      return res
        .status(401)
        .json({ error: 'You are not authorized to delete this comment' });

    await queries.deleteComment(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment', error);
    res
      .status(500)
      .json({ error: 'Internal server error while deleting the comment' });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params as { commentId: string };
    if (!commentId)
      return res.status(400).json({ error: 'Comment ID is required' });

    const comment = await queries.getCommentById(commentId);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error getting comment', error);
    res
      .status(500)
      .json({ error: 'Internal server error while getting the comment' });
  }
};
