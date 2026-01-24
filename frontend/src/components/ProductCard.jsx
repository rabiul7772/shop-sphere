import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

const ProductCard = ({ product, isOwner, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative pt-4">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="rounded-xl h-48 w-full object-cover px-4"
        />
      </figure>

      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-lg font-semibold text-base-content">
            {product.title}
          </h2>
          <div className="text-primary font-bold text-lg">
            ${product.price ? product.price : '0.00'}
          </div>
        </div>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {product.description}
        </p>

        <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-content/10 w-full">
          {/* Owner Info - Left Side */}
          <div className="flex items-center gap-2 text-sm text-base-content/70 font-medium">
            <img
              src={
                product.ownerImageUrl ||
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              }
              alt={product.ownerName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-base-100"
            />
            <span>{product.ownerName}</span>
          </div>

          {/* Actions - Right Side */}
          <div>
            {isOwner ? (
              <div className="flex gap-2">
                <Link
                  to={`/product/edit/${product.id}`}
                  className="btn btn-sm btn-info btn-outline btn-square"
                >
                  <Edit className="size-4" />
                </Link>
                <button
                  className="btn btn-sm btn-error btn-outline btn-square"
                  onClick={() => onDelete(product.id)}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ) : (
              <Link
                to={`/product/${product.id}`}
                className="btn btn-sm btn-primary"
              >
                View Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
