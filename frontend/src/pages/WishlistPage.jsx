import React from "react";
import axios from "axios";
import Card from "../components/Card";
import Loadar from "../components/Loadar";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <Card key={product?._id} product={product} />
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
