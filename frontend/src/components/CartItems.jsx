import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function CartItems({ product, itemid, fetchCartItems, qty }) {
  const [count, setCount] = useState(qty);

  const handleDeleteCartItem = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/cart/delete/${itemid}`
      );
      if (response.status === 200) {
        toast.success("Item removed from cart");
        fetchCartItems();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleUpdateQuantity = async (quantity) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/cart/updateqty/${itemid}/${quantity}`
      );
      if (response.status === 200) {
        fetchCartItems();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="grid grid-cols-6 gap-2  p-4">
      <div className="col-span-1">
        <img src={product?.image} alt="product" className="w-24 h-24" />
      </div>
      <div className="col-span-4">
        <h3 className="text-xl font-semibold">{product?.name}</h3>
        <p className="text-sm">INR {product?.price}</p>
        <div className="flex gap-4 items-center mt-4">
          <button
            className="bg-black text-white px-2 py-1 rounded-lg"
            onClick={() => {
              if (count > 1) {
                setCount(count - 1);
                handleUpdateQuantity(count - 1);
              }
            }}
          >
            -
          </button>
          <p>{count}</p>
          <button
            className="bg-black text-white px-2 py-1 rounded-lg"
            onClick={() => {
              if (count < product?.quantity) {
                setCount(count + 1);
                handleUpdateQuantity(count + 1);
              }
            }}
          >
            +
          </button>
        </div>
      </div>
      <div
        className="col-span-1 flex justify-end items-center"
        onClick={handleDeleteCartItem}
      >
        <DeleteOutlineIcon sx={{ color: "red", cursor: "pointer" }} />
      </div>

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
