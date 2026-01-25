import { Calendar, User } from 'lucide-react';
import OwnerInfo from './OwnerInfo';

const ProductInfo = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 h-full">
      <div className="card-body p-6">
        {/* Header Section */}
        <h2 className="card-title text-3xl font-bold mb-4">{product.title}</h2>

        {/* Metadata */}
        <div className="flex items-center gap-6 text-base-content/60 text-sm mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <span>{product.createdAt || '12/4/2025'}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="size-4" />
            <span>{product.ownerName}</span>
          </div>
        </div>

        <div className="divider my-0"></div>

        {/* Description */}
        <div className="py-4">
          <p className="text-base-content/80 leading-relaxed text-lg">
            {product.description}
          </p>
        </div>

        <div className="divider my-0"></div>

        {/* Owner Info */}
        <div className="pt-2">
          <OwnerInfo
            owner={{
              name: product.ownerName,
              imageUrl: product.ownerImageUrl
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
