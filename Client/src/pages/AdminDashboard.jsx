import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        setLoading(false);
        return;
      }

      const res = await API.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Dashboard Stats:", res.data);

      setStats({
        totalUsers: res.data.totalUsers || 0,
        totalProducts: res.data.totalProducts || 0,
        totalOrders: res.data.totalOrders || 0,
        revenue: res.data.revenue || 0
      });

    } catch (error) {
      console.log("Dashboard Error:", error);

      if (error.response) {
        console.log(
          "Server Response:",
          error.response.data
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "50px",
          textAlign: "center"
        }}
      >
        <h2>Loading Dashboard...</h2>
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
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto"
        }}
      >
        <h1
          style={{
            color: "#0f172a",
            marginBottom: "10px"
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px"
          }}
        >
          Manage Products, Orders and Users
        </p>

        {/* Analytics Cards */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
            gap: "20px",
            marginBottom: "40px"
          }}
        >
          <div style={cardStyle}>
            <h3>👥 Users</h3>
            <h1>{stats.totalUsers}</h1>
          </div>

          <div style={cardStyle}>
            <h3>🛍 Products</h3>
            <h1>{stats.totalProducts}</h1>
          </div>

          <div style={cardStyle}>
            <h3>📦 Orders</h3>
            <h1>{stats.totalOrders}</h1>
          </div>

          <div style={cardStyle}>
            <h3>💰 Revenue</h3>
            <h1>₹{stats.revenue}</h1>
          </div>
        </div>

        {/* Admin Menu */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px"
          }}
        >
          <Link
            to="/admin/products"
            style={{
              textDecoration: "none"
            }}
          >
            <div style={menuCard}>
              <h2
                style={{
                  color: "#2563eb"
                }}
              >
                🛍 Products
              </h2>

              <p>
                Add, Edit and Delete Products
              </p>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            style={{
              textDecoration: "none"
            }}
          >
            <div style={menuCard}>
              <h2
                style={{
                  color: "#16a34a"
                }}
              >
                📦 Orders
              </h2>

              <p>
                Manage Customer Orders
              </p>
            </div>
          </Link>

          <Link
            to="/admin/users"
            style={{
              textDecoration: "none"
            }}
          >
            <div style={menuCard}>
              <h2
                style={{
                  color: "#7c3aed"
                }}
              >
                👥 Users
              </h2>

              <p>
                View Registered Users
              </p>
            </div>
          </Link>
        </div>

        {/* Overview */}

        <div
          style={{
            marginTop: "40px",
            background: "white",
            padding: "30px",
            borderRadius: "15px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)"
          }}
        >
          <h2
            style={{
              color: "#0f172a"
            }}
          >
            Quick Overview
          </h2>

          <p style={{ color: "#64748b" }}>
            Welcome to ShopEZ Admin Panel.
          </p>

          <p style={{ color: "#64748b" }}>
            Manage products, orders,
            customers and monitor
            business growth from one place.
          </p>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  boxShadow:
    "0 5px 15px rgba(0,0,0,0.08)",
  textAlign: "center"
};

const menuCard = {
  background: "white",
  padding: "30px",
  borderRadius: "15px",
  boxShadow:
    "0 5px 15px rgba(0,0,0,0.08)",
  cursor: "pointer",
  color: "#64748b"
};

export default AdminDashboard;