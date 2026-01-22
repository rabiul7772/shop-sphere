import type { Request, Response } from 'express';

import * as queries from '../db/queries';
import { getAuth } from '@clerk/express';

// Get all products [PUBLIC]

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products', error);
    res
      .status(500)
      .json({ error: 'Internal server error while fetching all the products' });
  }
};

// Get products by current user [PROTECTED]

export const getMyProducts = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const products = await queries.getProductsByUserId(userId);

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products', error);
    res
      .status(500)
      .json({ error: 'Internal server error while fetching the product' });
  }
};

// Get single product by ID [PUBLIC]

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const product = await queries.getProductById(id);
    if (!product) res.status(404).json({ error: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product', error);
    res
      .status(500)
      .json({ error: 'Internal server error while fetching the product' });
  }
};

// Create product [PROTECTED]

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl)
      return res.status(400).json({ error: 'Missing required fields' });

    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product', error);
    res
      .status(500)
      .json({ error: 'Internal server error while creating the product' });
  }
};

// Update owner product  [PROTECTED]

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params as { id: string };
    if (!id) return res.status(400).json({ error: 'Product ID is required' });

    const product = await queries.getProductById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (userId !== product.userId)
      return res
        .status(401)
        .json({ error: 'You are not authorized to update this product' });

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl)
      return res.status(400).json({ error: 'Missing required fields' });

    const updatedProduct = await queries.updateProduct(id, {
      title,
      description,
      imageUrl,
      userId
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product', error);
    res
      .status(500)
      .json({ error: 'Internal server error while updating the product' });
  }
};

// Delete owner product  [PROTECTED]

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params as { id: string };
    if (!id) return res.status(400).json({ error: 'Product ID is required' });

    const product = await queries.getProductById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if (userId !== product.userId)
      return res
        .status(401)
        .json({ error: 'You can only delete your own products' });

    await queries.deleteProduct(id);

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product', error);
    res
      .status(500)
      .json({ error: 'Internal server error while deleting the product' });
  }
};
