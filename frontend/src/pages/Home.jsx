import { useAuth } from '@clerk/clerk-react';
import { useRef, useEffect, useState } from 'react';
import { Package, PlusCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';

import { PRODUCTS } from '../constants';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const [products, setProducts] = useState(PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isSignedIn } = useAuth();

  const productSectionRef = useRef(null);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchProducts = async () => {
    // For now using dummy data from constants
    setLoading(true);
    try {
      // Mock API call
      // const response = await fetch('http://localhost:3000/api/v1/products');
      // if (!response.ok) {
      //   throw new Error('Failed to fetch products');
      // }
      // const data = await response.json();
      setProducts(PRODUCTS);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async id => {
    // In a real app we'd call the API deletion here,
    // but for 'All Products' view, users usually can only delete their own if authorized.
    // This handler is passed to ProductCard, implementing optimistically or via API.
    // For now, let's just log or re-fetch.
    console.log('Delete requested for', id);
    // Re-fetch to update list if the deletion happened elsewhere or implement logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="hero bg-base-200 py-16 rounded-box mb-12 overflow-hidden relative">
        <div className="hero-content flex-col lg:flex-row-reverse w-full justify-between px-8">
          {/* Image/Illustration Placeholder - Using a generic handsome 3D illustration logic or placeholder */}
          <div className="w-full lg:w-1/2 flex justify-center relative">
            {/* Decorative background circle */}
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl transform scale-75"></div>
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720828800&semt=ais_user" // Placeholder similar to the design
              alt="E-commerce illustration"
              className="max-w-xs md:max-w-sm rounded-lg shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <h1 className="text-5xl font-bold leading-tight">
              Share Your <span className="text-primary">Products</span>
            </h1>
            <p className="py-2 text-xl text-base-content/80 max-w-lg mx-auto lg:mx-0">
              Upload, discover, and connect with creators. Join our marketplace
              today.
            </p>

            <div className="flex justify-center lg:justify-start">
              {isSignedIn ? (
                <Link
                  to="/product/create"
                  className="btn btn-primary btn-lg gap-3"
                >
                  <PlusCircle className="size-6" />
                  Start Selling
                </Link>
              ) : (
                <button
                  className="btn btn-primary btn-lg gap-3"
                  onClick={scrollToProducts}
                >
                  <Package className="size-6" />
                  Explore Products
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1" ref={productSectionRef}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Package className="size-8 text-primary" />
            All Products
          </h2>
          <button onClick={fetchProducts} className="btn btn-ghost btn-circle">
            <RefreshCw className={`size-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Home;
