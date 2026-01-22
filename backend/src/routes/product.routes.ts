import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct
} from '../controllers/product.controller';
import { requireAuth } from '@clerk/express';

const productRouter = Router();

// /api/v1/products > get all the products [PUBLIC]

productRouter.get('/', getAllProducts);
productRouter.get('/my', requireAuth(), getMyProducts);
productRouter.get('/:id', getProductById);

productRouter.post('/', requireAuth(), createProduct);
productRouter.put('/:id', requireAuth(), updateProduct);

productRouter.delete('/:id', requireAuth(), deleteProduct);

export default productRouter;
