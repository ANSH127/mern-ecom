import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import Loadar from "../components/Loadar";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartItemsLength } from "../redux/slices/cartItemsLength";

export default function ProductDetailPage() {
  const { id } = useParams();
  //   console.log(id);

  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://backend-sigma-ecru.vercel.app/api/products/${id}`
      );
      const data = await response.json();
      // console.log(data);
      setProductDetails(data);
      fetchSimilarProducts(data.category);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/products/category/${category}`
      );
      let data = await response.json();

      data = data.filter((product) => product._id !== id);
      console.log(data);

      setSimilarProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWishlist = async () => {
    if (localStorage.getItem("token") === null) {
      toast.error("Please login to add items to your wishlist.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://backend-sigma-ecru.vercel.app/api/wishlist/add`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setIsInWishlist(true);
      toast.success("Product added to wishlist!");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please login again.");
      } else {
        toast.error(error.response.data.message);
      }
    }
  };

  const isProductInWishlist = async () => {
    if (localStorage.getItem("token") === null) {
      return false;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://backend-sigma-ecru.vercel.app/api/wishlist/check`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      setIsInWishlist(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please login again.");
      } else {
        toast.error("Something went wrong");
      }
      return false;
    }
  };

  const handleAddToCart = async () => {
    if (localStorage.getItem("token") === null) {
      toast.error("Please login to add to cart");
      return;
    }

    try {
      const response = await axios.post(
        `https://backend-sigma-ecru.vercel.app/api/cart/add`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Added to cart");
        dispatch(setCartItemsLength("increment"));
        setIsInCart(true);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const isProductInCart = async () => {
    if (localStorage.getItem("token") === null) {
      return false;
    }
    try {
      const response = await axios.post(
        `https://backend-sigma-ecru.vercel.app/api/cart/check`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data);
      setIsInCart(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFromWishlist = async () => {
    if (localStorage.getItem("token") === null) {
      toast.error("Please login to remove items from your wishlist.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://backend-sigma-ecru.vercel.app/api/wishlist/remove`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            productId: id,
          },
        }
      );
      // console.log(response.data);
      setIsInWishlist(false);
      toast.success("Product removed from wishlist!");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please login again.");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    isProductInWishlist();
    isProductInCart();
    fetchProductDetails();
  }, []);

  return (
    <div className="sm:w-4/5 w-full mx-auto text-black">
      {/* // display product details here half side image and half side details */}
      {loading ? (
        <Loadar />
      ) : (
        <>
          <div className="flex flex-wrap justify-around gap-x-2 py-4">
            <div className="sm:w-2/5 w-full mx-auto flex justify-center">
              <img
                src={productDetails.imageUrl}
                alt="product"
                className="w-full h-auto max-w-md"
              />
            </div>
            <div className="sm:w-1/2 w-full mx-auto p-4">
              <h1 className="sm:text-4xl text-2xl">{productDetails.name}</h1>
              <div className="flex mt-2">
                <StarIcon className="text-yellow-500" />
                <StarIcon className="text-yellow-500" />
                <StarIcon className="text-yellow-500" />
                <StarIcon className="text-yellow-500" />
                <StarBorderOutlinedIcon className="text-yellow-500" />
                <p className="text-base pt-0.5">26 reviews</p>
              </div>
              <p className="text-lg pt-4">INR {productDetails.price}</p>
              <p>(incl. of all taxes) </p>
              <p
                className="text-lg pt-4 font-light"
                style={{ letterSpacing: ".2rem" }}
              >
                DESCRIPTION
              </p>
              <p className="text-sm font-mono">{productDetails.description}</p>
              <button
                className="bg-black w-full text-white px-4 mt-2 rounded py-2"
                onClick={isInCart ? () => navigate("/cart") : handleAddToCart}
              >
                {isInCart ? "Go to Cart" : "Add to Cart"}
              </button>

              <button
                className="bg-black w-full text-white px-4 rounded py-2 mt-4"
                onClick={
                  isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
                }
              >
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
          <div className="p-6"
          >
            <h1 className="text-2xl font-bold text-center">Similar Products</h1>
            <div className="relative">
              <div className="flex overflow-x-scroll no-scrollbar space-x-4 py-4">
                {similarProducts.map((product) => (
                  <>
                    <div
                      key={product._id}
                      className="bg-white p-2 rounded-lg shadow-lg min-w-[200px] flex-shrink-0"
                    >
                      <img
                        src={product.imageUrl}
                        alt="product"
                        className="w-full h-96  object-cover"
                      />
                      <p className="text-lg">{product.name}</p>
                      <p className="text-lg">INR {product.price}</p>
                      <button
                        className="bg-black text-white px-4 py-2 rounded mt-2 w-full"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </>
                ))}
              </div>
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                onClick={() => {
                  document.querySelector(".no-scrollbar").scrollBy({
                    left: -200,
                    behavior: "smooth",
                  });
                }}
              >
                &lt;
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                onClick={() => {
                  document.querySelector(".no-scrollbar").scrollBy({
                    left: 200,
                    behavior: "smooth",
                  });
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </>
      )}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
        limit={1}
      />
    </div>
  );
}
