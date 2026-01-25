const OwnerInfo = ({ owner }) => {
  if (!owner) return null;

  const name = owner.name ?? 'Unknown';
  const imageUrl = owner.imageUrl ?? '';

  return (
    <div className="flex items-center gap-4">
      <div className="avatar">
        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img src={imageUrl} alt={name} className="object-cover" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-base-content">{name}</h3>
        <p className="text-xs text-primary font-medium">Creator</p>
      </div>
    </div>
  );
};

export default OwnerInfo;
