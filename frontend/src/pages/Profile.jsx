import { useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileProductList from '../components/profile/ProfileProductList';

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      // In a real app, we would fetch only the logged-in user's products
      // Here we just use all products for demonstration
      setProducts(PRODUCTS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in zoom-in duration-500">
      <ProfileHeader />

      {/* Stats Section */}
      <ProfileStats totalProducts={products.length} />

      {/* Product List Section */}
      <div className="flex flex-col gap-6">
        <ProfileProductList
          products={products}
          loading={loading}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Profile;
