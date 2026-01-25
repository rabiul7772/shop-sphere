import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { PRODUCTS } from '../constants';
import ProductForm from '../components/product-form/ProductForm';
import { ArrowLeft } from 'lucide-react';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching product data
    const foundProduct = PRODUCTS.find(p => p.id === parseInt(id));

    // Simulate network delay
    setTimeout(() => {
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  const handleUpdate = formData => {
    // Here we would normally make an API call to update the product
    console.log('Updating product:', { id, ...formData });

    // Simulate success and navigate back
    setTimeout(() => {
      alert('Product updated successfully!'); // In real app, use toast
      navigate('/profile');
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-bold">Product not found</h3>
        <div className="mt-4">
          <button
            onClick={() => navigate('/profile')}
            className="btn btn-primary"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4  animate-in fade-in zoom-in duration-500">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost mb-4 gap-2 hover:bg-base-200"
      >
        <ArrowLeft className="size-5" />
        Back
      </button>

      <ProductForm
        initialData={product}
        title="Edit Product"
        buttonText="Save Changes"
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default ProductEdit;
