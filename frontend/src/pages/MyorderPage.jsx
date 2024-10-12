import React from "react";
import axios from "axios";

export default function MyorderPage() {
  const [orders, setOrders] = React.useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/orders/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);

      setOrders(response.data);

      //   setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="sm:w-4/5 w-full mx-auto">
      <h1 className="text-2xl font-semibold my-4">My Orders</h1>
      <div className="flex flex-col">
        <div className="flex justify-between border-b-2 border-gray-200 py-2">
          <div className="w-1/4">Order ID</div>
          <div className="w-1/4">Date</div>
          <div className="w-1/4">Total</div>
          <div className="w-1/4">Status</div>
        </div>

        {orders.map((order) => (
          <div
            className="flex justify-between border-b-2 border-gray-200 py-2"
            key={order.id}
          >
            <div className="w-1/4">{order._id}</div>
            <div className="w-1/4">{order.createdAt}</div>
            <div className="w-1/4">₹ {order.totalPrice}</div>
            <div className="w-1/4">{order.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
