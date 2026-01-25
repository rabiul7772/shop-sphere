import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

const ProductHeader = ({ onEdit, onDelete, isOwner = true }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Link
        to="/"
        className="btn btn-ghost hover:bg-base-300 gap-2 pl-0 hover:pl-2 transition-all"
      >
        <ArrowLeft className="size-5" />
        Back
      </Link>

      {isOwner && (
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="btn btn-ghost hover:bg-base-300 gap-2"
          >
            <Edit className="size-4" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="btn btn-error btn-sm md:btn-md gap-2 text-white"
          >
            <Trash2 className="size-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductHeader;
