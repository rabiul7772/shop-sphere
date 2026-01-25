import { Plus } from 'lucide-react';
import { Link } from 'react-router';

const ProfileHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-base-content">My Products</h1>
        <p className="text-base-content/60 mt-1">Manage your listings</p>
      </div>
      <Link
        to="/product/create"
        className="btn btn-primary btn-md gap-2 w-full sm:w-auto"
      >
        <Plus className="size-5" />
        New
      </Link>
    </div>
  );
};

export default ProfileHeader;
