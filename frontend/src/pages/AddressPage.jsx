import React from "react";

import axios from "axios";

import AddaddressDialog from "../components/AddaddressDialog";

import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loadar from "../components/Loadar";
import Success from "../components/Success";

export default function AddressPage() {
  const [address, setAddress] = React.useState(null);
  const [selectedaddress, setSelectedAddress] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);

  const fetchUserAddress = async () => {
    try {
      const token=localStorage.getItem("token")
      const response = await axios.get(
        `http://localhost:4000/api/address/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUserAddress();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("ansh");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleCheckout = async () => {
    if (localStorage.getItem("token") === null) {
      toast.error("Please login to checkout");
      return;
    }

    if (selectedaddress === null) {
      toast.error("Please select an address to checkout");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4000/api/orders/add`,
        {
          shippingAddress: selectedaddress,
          shippingPrice: 100,
          paymentMethod: "COD",
          deliverydate: new Date(new Date().setDate(new Date().getDate() + 3)), // 3 days after the current date

        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status == 201) {
        setCheckout(true);
      } else {
        toast.error("Error in placing order");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {checkout ? (
        <Success />
      ) : (
        <div className="sm:w-4/5 w-full mx-auto text-black py-4">
          <div>
            <div className="text-center">
              <button
                className="bg-blue-500 text-white p-2 rounded-lg"
                onClick={handleClickOpen}
              >
                Add Address
              </button>
            </div>
            <AddaddressDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
          </div>

          <div className="flex flex-col gap-4 py-2">
            {address?.map((add) => {
              return (
                <div
                  key={add.id}
                  className="p-4 rounded-lg bg-gray-200"
                  onClick={() => setSelectedAddress(add._id)}
                  style={{
                    backgroundColor:
                      selectedaddress === add._id ? "lightblue" : "",
                    cursor: "pointer",
                  }}
                >
                  <h1 className="text-xl font-semibold">{add.fullName}</h1>
                  <p>{add.address}</p>
                  <p>{add.postalCode}</p>
                  <p>{add.phoneNumber}</p>
                </div>
              );
            })}

            {address?.length === 0 && (
              <div className="text-center font-bold text-black text-2xl py-4">
                No Address added
              </div>
            )}

            <div className="text-center">
              {loading ? (
                <Loadar />
              ) : (
                <button
                  className="bg-blue-500 text-white p-2 rounded-lg"
                  onClick={handleCheckout}
                >
                  Proceed to Payment
                </button>
              )}
            </div>
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
      )}
    </div>
  );
}
