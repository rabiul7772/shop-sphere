import { getAuth } from '@clerk/express';
import type { Request, Response } from 'express';

import * as queries from '../db/queries';

export const syncUser = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, email, imageUrl } = req.body;

    if (!name || !email || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await queries.upsertUser({
      id: userId,
      email,
      name,
      imageUrl
    });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error syncing user', error);
    res
      .status(500)
      .json({ error: 'Internal server error, failed to sync user' });
  }
};
