import { Package } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-xl h-96">
            <div className="skeleton h-48 w-full rounded-t-xl"></div>
            <div className="card-body p-4 space-y-4">
              <div className="skeleton h-6 w-3/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
              <div className="skeleton h-10 w-full mt-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>{error}</span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-base-100 rounded-xl shadow-sm border border-base-content/10">
        <Package className="size-16 mx-auto text-base-content/30 mb-4" />
        <h3 className="text-xl font-bold text-base-content/70">
          No products found
        </h3>
        <p className="text-base-content/50">Be the first to create one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
