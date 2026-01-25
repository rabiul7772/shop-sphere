import { Package } from 'lucide-react';

const ProfileStats = ({ totalProducts }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 mb-8">
      <div className="card-body p-6">
        <div className="flex items-center gap-2 text-base-content/60 mb-2">
          <Package className="size-4" />
          <span className="text-sm font-medium">Total Products</span>
        </div>
        <div className="text-4xl font-bold text-primary">{totalProducts}</div>
      </div>
    </div>
  );
};

export default ProfileStats;
