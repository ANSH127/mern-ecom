import React from "react";
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loadar from "../components/Loadar";
import Success from "../components/Success";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useDispatch } from "react-redux";
import { setCartItemsLength } from "../redux/slices/cartItemsLength";


export default function SelectAddressPage() {
  const [address, setAddress] = React.useState(null);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [checkout, setCheckout] = React.useState(false);
  const dispatch = useDispatch();

  const fetchUserAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://backend-sigma-ecru.vercel.app/api/address/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddress(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchUserAddress();
  }, []);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "https://backend-sigma-ecru.vercel.app/api/payment/order",
      {},
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      }
    );
    const data = res.data;
    console.log(data);
    


    

    const options = {
      key: "rzp_test_ufGoxV9E2Qfxq0", // Enter the Key ID generated from the Dashboard
      amount: data.amount,
      currency: data.currency,
      name: "TrenMingle",
      description: "Test Transaction",
      order_id: data.id,
      handler: async function (response) {
        // Verify payment signature
        setLoading(true);
        try {
          const verifyResponse = await axios.post(
            "https://backend-sigma-ecru.vercel.app/api/payment/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyResponse.data.status === "success") {
            // Save order only if payment is verified
            const token = localStorage.getItem("token");
            const orderResponse = await axios.post(
              "https://backend-sigma-ecru.vercel.app/api/orders/add",
              {
                shippingAddress: selectedAddress,
                shippingPrice: 100,
                paymentMethod: "Razorpay",
                deliverydate: new Date(
                  new Date().setDate(new Date().getDate() + 3)
                ), // 3 days after the current date
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (orderResponse.status === 201) {
              dispatch(setCartItemsLength(0));
              setCheckout(true);
            } else {
              toast.error("Error in placing order");
            }
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          console.log(error);
          toast.error("Error in verifying payment");
        }
        finally{
          setLoading(false);
        }
      },
      prefill: {
        name: "Anonymous",
        email: "ansh12@gmail.com",
        contact: "1234567890",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleCheckout = () => {
    if (localStorage.getItem("token") === null) {
      toast.error("Please login to checkout");
      return;
    }

    if (selectedAddress === null) {
      toast.error("Please select an address to checkout");
      return;
    }

    handlePayment();
  };

  return (
    <div>
      {checkout ? (
        <Success />
      ) : (
        <div className="sm:w-11/12 w-full mx-auto text-black py-4">
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
                    selectedAddress === add._id ? "bg-green-300" : ""
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
