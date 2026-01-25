import { useNavigate } from 'react-router';
import ProductForm from '../components/product-form/ProductForm';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '../constants';

const ProductCreate = () => {
  const navigate = useNavigate();

  const handleCreate = formData => {
    // Here we would normally make an API call to create the product
    const newProduct = {
      ...formData,
      id: PRODUCTS.length + 1, // Simple ID generation for mock
      ownerName: 'You',
      ownerImageUrl:
        'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
      createdAt: new Date().toLocaleDateString()
    };

    console.log('Creating product:', newProduct);

    // Simulate success and navigate back
    setTimeout(() => {
      alert('Product created successfully!'); // In real app, use toast
      navigate('/profile');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 animate-in fade-in zoom-in duration-500">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost mb-4 gap-2 hover:bg-base-200"
      >
        <ArrowLeft className="size-5" />
        Back
      </button>

      <ProductForm
        title="New Product"
        buttonText="Create Product"
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default ProductCreate;
