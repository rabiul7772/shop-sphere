import { db } from './index';
import { eq } from 'drizzle-orm';

import {
  type NewProduct,
  type NewUser,
  type NewComment,
  users,
  products,
  comments
} from './schema';

// USER QUERIES

export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();

  return user;
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  // check if user exists
  const user = await getUserById(id);
  if (!user) throw new Error('User not found');

  const [updatedUser] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();

  return updatedUser;
};

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id)
  });
};

export const upsertUser = async (data: NewUser) => {
  const [user] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: data
    })
    .returning();

  return user;
};

// PRODUCT QUERIES

export const createProduct = async (data: NewProduct) => {
  const [product] = await db.insert(products).values(data).returning();

  return product;
};

export const getAllProducts = async () => {
  return await db.query.products.findMany({
    with: { user: true },
    orderBy: (products, { desc }) => [desc(products.createdAt)]
  });
};

export const getProductById = async (id: string) => {
  return await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      user: true,
      comments: {
        with: { user: true },
        orderBy: (comments, { desc }) => [desc(comments.createdAt)]
      }
    }
  });
};

export const getProductsByUserId = async (userId: string) => {
  return await db.query.products.findMany({
    where: eq(products.userId, userId),
    with: {
      user: true
    },
    orderBy: (products, { desc }) => [desc(products.createdAt)]
  });
};

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
  const product = await getProductById(id);
  if (!product) throw new Error('Product not found');

  const [updatedProduct] = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();

  return updatedProduct;
};

export const deleteProduct = async (id: string) => {
  const product = await getProductById(id);
  if (!product) throw new Error('Product not found');

  const [deletedProduct] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();

  return deletedProduct;
};

// COMMENT QUERIES

export const createComment = async (data: NewComment) => {
  const [comment] = await db.insert(comments).values(data).returning();

  return comment;
};

export const updateComment = async (id: string, data: Partial<NewComment>) => {
  const [comment] = await db
    .update(comments)
    .set(data)
    .where(eq(comments.id, id))
    .returning();

  return comment;
};

export const deleteComment = async (id: string) => {
  const comment = await getCommentById(id);
  if (!comment) throw new Error('Comment not found');

  const [deletedComment] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();

  return deletedComment;
};

export const getCommentById = async (id: string) => {
  return await db.query.comments.findFirst({
    where: eq(comments.id, id),
    with: {
      user: true
    }
  });
};
