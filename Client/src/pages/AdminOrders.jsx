import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        return;
      }

      const res = await API.get("/order/all", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Orders Response:", res.data);

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/order/status/${id}`,
        {
          orderStatus: status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Order Status Updated");

      fetchOrders();
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      alert("Failed To Update Status");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px"
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          color: "#0f172a"
        }}
      >
        Manage Orders
      </h1>

      {orders.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px"
          }}
        >
          <h2>No Orders Found</h2>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
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
                src={`/images/${order.mainImg}`}
                alt={order.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain"
                }}
              />

              <div style={{ flex: 1 }}>
                <h2>{order.title}</h2>

                <p>
                  <strong>Price:</strong> ₹ {order.price}
                </p>

                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>

                <p>
                  <strong>User ID:</strong> {order.userId}
                </p>

                <p>
                  <strong>Order Date:</strong>{" "}
                  {order.orderDate || "N/A"}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {order.orderStatus}
                </p>
              </div>

              <select
                value={order.orderStatus}
                onChange={(e) =>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  minWidth: "180px"
                }}
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;