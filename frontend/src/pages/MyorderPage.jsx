import  { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

export default function MyOrderPage() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`https://backend-sigma-ecru.vercel.app/api/orders/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" className="p-3">
        My Orders
      </Typography>
      {orders.map((order) => (
        <Accordion key={order._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${order._id}-content`}
            id={`panel${order._id}-header`}
          >
            <Typography variant="h6">Order ID: {order._id}</Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              Order Date: {new Date(order.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              Total Price: ₹{order.totalPrice}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1">
              Delivery Date: {new Date(order.deliverydate).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1">Status: {order.status}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Shipping Address</Typography>
            <Typography>
              {order.shippingAddress?.fullName}, {order.shippingAddress?.address},{" "}
              {order.shippingAddress?.city}, {order.shippingAddress?.state},{" "}
              {order.shippingAddress?.postalCode},{" "}
              {order.shippingAddress?.phoneNumber}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Order Items</Typography>
            {order.orderItems.map((item) => (
              <Card key={item._id} sx={{ display: "flex", mb: 2 }}>
                <Link to={`/product/${item.product._id}`}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={item.product.imageUrl}
                  alt={item.product.name}
                />
                </Link>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent>
                    <Link to={`/product/${item.product._id}`}>
                    <Typography component="div" variant="h6">
                      {item.product.name}
                    </Typography>
                    </Link>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {item.product.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Quantity: {item.count}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Price: ₹{item.price}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Payment Details</Typography>
            <Typography>Payment Method: {order.paymentMethod}</Typography>
            <Typography>Shipping Price: ₹{order.shippingPrice}</Typography>
            <Typography>Total Price: ₹{order.totalPrice}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
}
