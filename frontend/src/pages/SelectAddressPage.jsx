import React from "react";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loadar from "../components/Loadar";
import Success from "../components/Success";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function SelectAddressPage() {
  const [address, setAddress] = React.useState(null);
  const [selectedaddress, setSelectedAddress] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);

  const fetchUserAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://backend-sigma-ecru.vercel.app/api/address/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUserAddress();
  }, []);

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
        `https://backend-sigma-ecru.vercel.app/api/orders/add`,
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
            <h1 className="text-2xl font-semibold text-center">
              Select Address
            </h1>
          </div>

          <div className="flex flex-wrap gap-4 py-2 ">
            {address?.map((add) => {
              return (
                <div
                  key={add._id}
                  className={`p-4 rounded-lg bg-gray-200 w-64 cursor-pointer sm:mx-0 mx-auto  ${
                    selectedaddress === add._id ? "bg-blue-300" : ""
                  }`}
                  onClick={() => setSelectedAddress(add._id)}
                >
                  <h1 className="text-xl font-semibold">{add.fullName}</h1>
                  <p>{add.address}</p>
                  <p>{add.postalCode}</p>
                  <p>{add.phoneNumber}</p>
                </div>
              );
            })}
            {/* <AddCircleIcon onClick={handleClickOpen} style={{ fontSize: 30 }} /> */}

            {address?.length === 0 && (
              <div className="text-center font-bold text-black text-2xl py-4">
                No Address added
              </div>
            )}

            <div className="text-center w-full">
              {loading ? (
                <Loadar />
              ) : (
                <ArrowCircleRightIcon
                  onClick={handleCheckout}
                  style={{ fontSize: 40 }}
                />
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
