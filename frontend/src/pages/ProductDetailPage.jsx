import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import Loadar from "../components/Loadar";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function ProductDetailPage() {
  const { id } = useParams();
  //   console.log(id);

  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/products/${id}`);
      const data = await response.json();
      // console.log(data);
      setProductDetails(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
        `http://localhost:4000/api/wishlist/add`,
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
        `http://localhost:4000/api/wishlist/check`,
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
        `http://localhost:4000/api/cart/add`,
        { productId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Added to cart");
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
        `http://localhost:4000/api/cart/check`,
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
        `http://localhost:4000/api/wishlist/remove`,
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
    <div className="sm:w-4/5 w-full mx-auto text-black ">
      {/* // display product details here half  side image and half side details */}
      {loading ? (
        <Loadar />
      ) : (
        <div className="flex flex-wrap justify-around gap-x-2 py-4">
          <div className="sm:w-2/5 w-full mx-auto flex justify-center">
            <img
              src={productDetails.imageUrl}
              alt="product"
              style={{ width: "400px", height: "600px" }}
            />
          </div>
          <div className=" sm:w-1/2 w-full mx-auto p-4">
            <h1 className="sm:text-4xl text-2xl ">{productDetails.name}</h1>
            <div className="flex mt-2">
              <StarIcon className="text-yellow-500" />
              <StarIcon className="text-yellow-500" />
              <StarIcon className="text-yellow-500" />
              <StarIcon className="text-yellow-500" />
              <StarBorderOutlinedIcon className="text-yellow-500" />
              <p className=" text-base pt-0.5">26 reviews</p>
            </div>
            <p className="text-lg pt-4">INR {productDetails.price}</p>
            <p>(incl. of all taxes) </p>
            <p
              className="text-lg pt-4 font-light"
              style={{ letterSpacing: ".2rem" }}
            >
              DESCRIPTION
            </p>
            <p className="text-sm  font-mono ">{productDetails.description}</p>
            <button
              className="bg-black w-full text-white px-4  mt-2  rounded py-2"
              onClick={isInCart ? () => navigate("/cart") : handleAddToCart}
            >
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>

            <button
              className="bg-black w-full text-white px-4   rounded py-2 mt-4"
              onClick={
                isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
              }
            >
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
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
