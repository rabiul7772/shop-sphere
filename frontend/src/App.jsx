import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProductCreate from './pages/ProductCreate';
import ProductDetails from './pages/ProductDetails';
import ProductEdit from './pages/ProductEdit';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen  bg-base-100">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/create" element={<ProductCreate />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product/edit/:id" element={<ProductEdit />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
