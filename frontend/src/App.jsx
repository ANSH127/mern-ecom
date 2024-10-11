import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route
  // Link
} from 'react-router-dom';




import HomePage from './pages/HomePage';
import Header from "./components/Header";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import MyorderPage from "./pages/MyorderPage";
import AddressPage from "./pages/AddressPage";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<MyorderPage />} />
        <Route path="/address" element={<AddressPage />} />

      </Routes>
    </Router>
  );
}

export default App;
