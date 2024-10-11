import React from "react";
import axios from "axios";

export default function MyorderPage() {
  const [orders, setOrders] = React.useState([]);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `http://localhost:8080/api/order/getorder/${user.id}`
      );
      //   console.log(response.data);

      // remove duplicate group id
      let unique = {};
      let distinct = [];
      for (let i in response.data) {
        if (typeof unique[response.data[i].groupId] == "undefined") {
          distinct.push(response.data[i]);
        }
        unique[response.data[i].groupId] = 0;
      }
      setOrders(distinct);

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
            <div className="w-1/4">{order.groupId}</div>
            <div className="w-1/4">{order.orderDate}</div>
            <div className="w-1/4">₹ {order.totalPrice}</div>
            <div className="w-1/4">{order.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
