import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  
  // Link
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import ProductDetailPage from "./pages/ProductDetailPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import MyorderPage from "./pages/MyorderPage";
import SelectAddressPage from "./pages/SelectAddressPage";
import AddressPage from "./pages/AddressPage";
import Footer from "./components/Footer";

import { useParams } from "react-router-dom";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailWrapper />} 
          
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<MyorderPage />} />
          <Route path="/selectaddress" element={<SelectAddressPage />} />
          <Route path="/address" element={<AddressPage />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

const ProductDetailWrapper = () => {
  const { id } = useParams();
  return <ProductDetailPage key={id} />;
};

export default App;
