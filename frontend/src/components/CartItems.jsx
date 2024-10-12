import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartItems({ product, fetchCartItems, qty }) {
  const [count, setCount] = useState(qty);

  const handleDeleteCartItem = async () => {
    try {
      const response = await axios.delete(
        `https://backend-sigma-ecru.vercel.app/api/cart/remove`,
        {
          data: {
            productId: product._id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Item removed from cart");
        fetchCartItems(); // Refresh the cart items
      }
    } catch (error) {
      toast.error("Failed to remove item from cart");
      console.error(error);
    }
  };

  const handleUpdateQuantity = async (quantity) => {
    try {
      const response = await axios.post(
        `https://backend-sigma-ecru.vercel.app/api/cart/update`,
        {
          productId: product._id,
          count: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchCartItems(); // Refresh the cart items
      }
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center">
        <Link to={`/product/${product?._id}`}>
          <img
            src={product?.imageUrl}
            alt="product"
            className="w-24 h-24 object-cover rounded-lg"
          />
        </Link>
        <div className="ml-4">
          <Link to={`/product/${product?._id}`}>
            <h2 className="text-lg font-semibold">{product?.name}</h2>
          </Link>
          <p className="text-gray-600">
            {product?.description.substring(0, 100)}...
          </p>
          <div className="flex items-center mt-2">
            <button
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300"
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                  handleUpdateQuantity(count - 1);
                }
              }}
            >
              <span className="text-xl font-bold">-</span>
            </button>
            <p className="mx-4 text-lg">{count}</p>
            <button
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg hover:bg-gray-300"
              onClick={() => {
                if (count < product?.countInStock) {
                  setCount(count + 1);
                  handleUpdateQuantity(count + 1);
                }
              }}
            >
              <span className="text-xl font-bold">+</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-lg font-semibold">₹{product?.price}</p>
        <button
          className="text-red-500 hover:text-red-700 mt-2"
          onClick={handleDeleteCartItem}
        >
          <DeleteOutlineIcon />
        </button>
      </div>
    </div>
  );
}
