import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { PRODUCTS } from '../constants';

import ProductHeader from '../components/product-details/ProductHeader';
import ProductImage from '../components/product-details/ProductImage';
import ProductInfo from '../components/product-details/ProductInfo';
import CommentsSection from '../components/product-details/CommentsSection';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find product by ID (handling string/number conversion)
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  // Mock initial comments state based on design
  const [comments, setComments] = useState([
    {
      id: 1,
      userName: 'Burak Örkmez',
      userImage: '', // Will fallback to initial
      date: '12/4/2025',
      text: "Yoo! sick. Text me at WP. I'll buy it. +1 (555) 123 4567"
    }
  ]);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddComment = text => {
    const newComment = {
      id: comments.length + 1,
      userName: 'You', // Placeholder for current user
      userImage: '',
      date: new Date().toLocaleDateString(),
      text
    };
    setComments([...comments, newComment]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in duration-500">
      <ProductHeader
        onEdit={() => navigate(`/product/edit/${id}`)}
        onDelete={() => console.log('Delete clicked')}
        isOwner={true} // For demo purposes, matching design which shows edit/delete
        onBack={() => navigate('/')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left Column - Image */}
        <div className="h-96 lg:h-[350px]">
          <ProductImage imageUrl={product.imageUrl} title={product.title} />
        </div>

        {/* Right Column - Info */}
        <div className="lg:h-[350px]">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Bottom Section - Comments */}
      <div className="mt-8">
        <CommentsSection comments={comments} onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default ProductDetails;
