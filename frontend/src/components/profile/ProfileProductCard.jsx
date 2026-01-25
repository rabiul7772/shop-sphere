import { Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

const ProfileProductCard = ({ product, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200">
      <div className="flex flex-col sm:flex-row h-full sm:h-40 overflow-hidden group">
        {/* Image Section */}
        <figure className="sm:w-40 w-full h-40 sm:h-full flex-shrink-0 bg-base-200">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </figure>

        {/* Content Section */}
        <div className="card-body p-5 flex-row justify-between items-center w-full gap-4">
          {/* Text Info */}
          <div className="flex-1 min-w-0 self-start sm:self-center">
            <h2 className="card-title text-xl font-bold mb-2 truncate">
              {product.title}
            </h2>
            <p className="text-base-content/70 line-clamp-2 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-6 self-start sm:self-center pt-4 sm:pt-0 border-t sm:border-t-0 border-base-content/10 w-full sm:w-auto mt-2 sm:mt-0 justify-end">
            <Link
              to={`/product/${product.id}`}
              className="flex flex-col items-center gap-1 text-base-content/70 hover:text-primary transition-colors group/btn"
            >
              <Eye className="size-5 group-hover/btn:scale-110 transition-transform" />
              <span className="text-xs font-semibold">View</span>
            </Link>

            <Link
              to={`/product/edit/${product.id}`}
              className="flex flex-col items-center gap-1 text-base-content/70 hover:text-success transition-colors group/btn"
            >
              <Edit className="size-5 group-hover/btn:scale-110 transition-transform" />
              <span className="text-xs font-semibold">Edit</span>
            </Link>

            <button
              onClick={() => onDelete(product.id)}
              className="flex flex-col items-center gap-1 text-base-content/70 hover:text-error transition-colors group/btn"
            >
              <Trash2 className="size-5 group-hover/btn:scale-110 transition-transform" />
              <span className="text-xs font-semibold">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileProductCard;
