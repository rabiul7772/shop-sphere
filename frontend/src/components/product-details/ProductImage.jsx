const ProductImage = ({ imageUrl, title }) => {
  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden h-full border border-base-200">
      <figure className="h-full w-full relative group">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </figure>
    </div>
  );
};

export default ProductImage;
