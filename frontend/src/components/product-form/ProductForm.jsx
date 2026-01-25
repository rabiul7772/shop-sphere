import { useState } from 'react';
import {
  Type,
  Image,
  DollarSign,
  AlignLeft,
  Save,
  Loader2
} from 'lucide-react';
import FormInput from './FormInput';
import ProductPreview from './ProductPreview';

const ProductForm = ({
  initialData = {},
  onSubmit,
  title,
  buttonText = 'Save Changes',
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    price: initialData.price || '',
    imageUrl: initialData.imageUrl || '',
    description: initialData.description || ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 max-w-2xl mx-auto">
      <div className="card-body px-6 py-4">
        <h2 className="card-title text-2xl font-bold mb-4 flex items-center gap-2">
          <Save className="size-5 text-primary" />
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Title */}
          <FormInput
            label="Product Title"
            icon={Type}
            type="text"
            name="title"
            placeholder="Enter product title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Price"
            icon={DollarSign}
            type="number"
            name="price"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={handleChange}
            required
          />

          {/* Image URL */}
          <FormInput
            label="Image URL"
            icon={Image}
            type="url"
            name="imageUrl"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />

          {/* Image Preview */}
          {formData.imageUrl && (
            <div className="form-control">
              <label className="label mb-1">
                <span className="label-text font-medium">Image Preview</span>
              </label>
              <div className="relative w-full h-40 bg-base-200 rounded-xl overflow-hidden border border-base-content/10 group">
                <ProductPreview imageUrl={formData.imageUrl} />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="form-control">
            <label className="label mb-1">
              <span className="label-text font-medium">Description</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none text-base-content/50">
                <AlignLeft className="size-5" />
              </div>
              <textarea
                name="description"
                placeholder="Product description..."
                className="textarea textarea-bordered w-full pl-10 h-12 text-base focus:textarea-primary transition-all duration-200"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          {/* Actions */}
          <div className="form-control mt-4">
            <button
              type="submit"
              className={`btn btn-primary w-full gap-2 ${isLoading ? 'btn-disabled' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Save className="size-5" />
              )}
              {isLoading ? 'Saving...' : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
