import OrderplaceGif from "../assets/images/order-placed.gif";
import { useNavigate } from "react-router-dom";

export default function Success() {
    const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center mx-auto py-4 flex-col">
        <h2 className="text-center font-bold text-xl">
          Order Placed Successfully
        </h2>
        <img
          src={OrderplaceGif}
          alt="Order Placed"
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>
      <button
        className="bg-black text-white  py-2 rounded-lg mx-auto justify-center items-center flex px-4"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>
    </>
  );
}
