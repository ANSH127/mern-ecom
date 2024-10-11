import CartItems from "../components/CartItems";
import React, { useState } from "react";
import axios from "axios";
import Loadar from "../components/Loadar";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    if (localStorage.getItem("user") === null) {
      toast.error("Please login to view cart");
      return;
    }
    try {
      // setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `http://localhost:8080/api/cart/getcart/${user.id}`
      );
      let total = 0;
      response.data.map((item) => {
        total += item.product.price * item.count;
      });
      setSubtotal(total);
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div>
      <div className="sm:w-4/5 w-full mx-auto">
        {loading ? (
          <Loadar />
        ) : (
          <div className="grid grid-cols-4  gap-4 p-4">
            <div className="col-span-4 sm:col-span-3 shadow-md  p-4 rounded-lg ">
              <h3 className="text-center font-bold text-xl">Cart Items</h3>
              <div
                className="overflow-y-auto"
                style={{ height: "70vh", scrollbarWidth: "thin" }}
              >
                {cartItems.map((product) => (
                  <CartItems
                    key={product.id}
                    product={product.product}
                    itemid={product.id}
                    fetchCartItems={fetchCartItems}
                    qty={product.count}
                  />
                ))}

                {cartItems.length === 0 && (
                  <div className="text-center font-bold text-black text-2xl py-4">
                    No products in cart
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-4 sm:col-span-1 shadow-md  p-4 rounded-lg">
              <h3 className="text-center font-bold text-xl">Cart Summary</h3>
              <div className="flex justify-between items-center py-2">
                <p>Subtotal</p>
                <p>INR {subtotal}</p>
              </div>
              <div className="flex justify-between items-center py-2">
                <p>Shipping</p>
                <p>INR {subtotal > 0 ? 100 : 0}</p>
              </div>
              <div className="flex justify-between items-center py-2">
                <p>Total</p>
                <p>INR {subtotal > 0 ? subtotal + 100 : 0}</p>
              </div>

              {subtotal > 0 && (
                <button
                  className="bg-black text-white w-full py-2 rounded-lg mt-4"
                  onClick={() => navigate("/address")}
                >
                  Proceed to Checkout
                </button>
              )}
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
    </div>
  );
}
