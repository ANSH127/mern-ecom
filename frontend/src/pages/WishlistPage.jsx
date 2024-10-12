import React from "react";
import axios from "axios";
import Card from "../components/Card";
import Loadar from "../components/Loadar";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function WishlistPage() {
  const [wishlist, setWishlist] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchWishlist = async () => {
    if (localStorage.getItem("token") === null) {
      toast.error("Please login to view wishlist");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:4000/api/wishlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (id) => {
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
      toast.success("Product removed from wishlist!");

      setWishlist(wishlist.filter((item) => item._id !== id));

    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please login again.");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  React.useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="sm:w-4/5 w-full mx-auto text-white ">
      {loading ? (
        <Loadar />
      ) : (
        <div className="flex flex-wrap justify-around sm:justify-start gap-y-4 py-4">
          {wishlist?.map((product) => (
            <div key={product?._id} className="relative">
              <Card product={product} />
              <button className="absolute top-2 right-2 text-red-500">
                {wishlist.some((item) => item._id === product._id) ? (
                  <FavoriteIcon
                    onClick={() => handleRemoveFromWishlist(product._id)}
                   />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {wishlist.length === 0 && !loading && (
        <div className="text-center font-bold text-black text-2xl py-4">
          No products in wishlist
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
