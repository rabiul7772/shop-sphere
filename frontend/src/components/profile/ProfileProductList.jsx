import ProfileProductCard from './ProfileProductCard';

const ProfileProductList = ({ products, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-base-100 rounded-xl border border-base-200 border-dashed">
        <h3 className="text-lg font-bold">No products found</h3>
        <p className="text-base-content/60">
          Start by creating your first listing!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map(product => (
        <ProfileProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProfileProductList;
