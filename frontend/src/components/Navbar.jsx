import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useAuth,
  UserButton
} from '@clerk/clerk-react';
import { Link } from 'react-router';
import { ShoppingBagIcon, LogIn, UserPlus, Plus, User } from 'lucide-react';

import ThemeSelector from './ThemeSelector';

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-content/10">
      <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost gap-2 normal-case text-xl">
            <ShoppingBagIcon className="size-6 text-primary" />
            <span className="text-lg font-bold font-mono tracking-wider hidden sm:inline">
              ShopSphere
            </span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <ThemeSelector />

          <SignedOut>
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <button className="btn btn-ghost btn-sm gap-2">
                  <LogIn className="size-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-primary btn-sm gap-2">
                  <UserPlus className="size-4" />
                  <span className="hidden sm:inline">Get Started</span>
                </button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <Link to="/product/create" className="btn btn-primary btn-sm gap-2">
              <Plus className="size-4" />
              <span className="hidden sm:inline">New Product</span>
            </Link>
            <Link
              to="/profile"
              className="btn btn-ghost btn-sm gap-2 font-bold"
            >
              <User className="size-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: 'size-10'
                }
              }}
            />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
