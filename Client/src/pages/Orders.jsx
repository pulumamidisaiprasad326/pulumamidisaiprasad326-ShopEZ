import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        `/order/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrders(res.data.orders || []);

    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/order/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Order Cancelled Successfully");

      fetchOrders();

    } catch (error) {
      console.log(error);
      alert("Failed To Cancel Order");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f59e0b";

      case "Processing":
        return "#3b82f6";

      case "Shipped":
        return "#8b5cf6";

      case "Delivered":
        return "#10b981";

      case "Cancelled":
        return "#ef4444";

      default:
        return "#64748b";
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px"
        }}
      >
        <h1
          style={{
            marginBottom: "30px"
          }}
        >
          My Orders
        </h1>

        {orders.length === 0 ? (
          <h3>No Orders Found</h3>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "#fff",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "15px",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,0.08)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                <img
                  src={`http://localhost:8000/uploads/${order.mainImg}`}
                  alt={order.title}
                  style={{
                    width: "140px",
                    height: "140px",
                    objectFit: "contain"
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h2>{order.title}</h2>

                  <p>{order.description}</p>

                  <p>
                    <strong>Price:</strong> ₹
                    {order.price}
                  </p>

                  <p>
                    <strong>Quantity:</strong>{" "}
                    {order.quantity}
                  </p>

                  <p>
                    <strong>Total:</strong> ₹
                    {order.totalAmount ||
                      order.price *
                        order.quantity}
                  </p>

                  <p>
                    <strong>Order Date:</strong>{" "}
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleString(
                          "en-IN"
                        )
                      : order.orderDate}
                  </p>

                  {order.invoiceNumber && (
                    <p>
                      <strong>
                        Invoice:
                      </strong>{" "}
                      {
                        order.invoiceNumber
                      }
                    </p>
                  )}

                  <p>
                    <strong>
                      Delivery Address:
                    </strong>
                    <br />
                    {order.name}
                    <br />
                    {order.mobile}
                    <br />
                    {order.address}
                    <br />
                    {order.city},{" "}
                    {order.state} -{" "}
                    {order.pincode}
                  </p>

                  <p>
                    <strong>
                      Payment:
                    </strong>{" "}
                    {order.paymentMethod}
                  </p>

                  <p>
                    Status:
                    <span
                      style={{
                        color:
                          getStatusColor(
                            order.orderStatus
                          ),
                        fontWeight: "bold",
                        marginLeft: "8px"
                      }}
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                </div>
              </div>

              {order.orderStatus !==
                "Cancelled" &&
                order.orderStatus !==
                  "Shipped" &&
                order.orderStatus !==
                  "Delivered" && (
                  <button
                    onClick={() =>
                      cancelOrder(
                        order._id
                      )
                    }
                    style={{
                      marginTop: "20px",
                      padding:
                        "10px 25px",
                      background:
                        "#ef4444",
                      color: "white",
                      border: "none",
                      borderRadius:
                        "10px",
                      cursor: "pointer"
                    }}
                  >
                    Cancel Order
                  </button>
                )}
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Orders;