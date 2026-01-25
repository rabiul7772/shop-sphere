const ProductPreview = ({ imageUrl }) => {
  return (
    <img
      src={imageUrl}
      alt="Preview"
      className="w-full h-full object-cover"
      onError={e => {
        e.target.onerror = null; // Prevent infinite loop
        e.target.src =
          'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
      }}
    />
  );
};

export default ProductPreview;
