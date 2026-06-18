import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const userData = JSON.parse(
      localStorage.getItem("user")
    );

    setUser(userData);

    if (userData) {
      fetchProfileData(userData._id);
    }
  }, []);

  const fetchProfileData = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const cartRes = await API.get(
        `/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCartCount(
        cartRes.data.cartItems?.length || 0
      );

      const orderRes = await API.get(
        `/order/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOrderCount(
        orderRes.data.orders?.length || 0
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "100px"
        }}
      >
        <h2>Please Login First</h2>
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
          maxWidth: "1000px",
          margin: "auto",
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        <div
          style={{
            height: "180px",
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)"
          }}
        />

        <div
          style={{
            padding: "30px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
              marginTop: "-90px"
            }}
          >
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "#fff",
                border: "5px solid white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "55px",
                fontWeight: "bold",
                color: "#2563eb",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,0.15)"
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#0f172a"
                }}
              >
                {user.name}
              </h1>

              <p
                style={{
                  color: "#64748b",
                  marginTop: "5px"
                }}
              >
                Customer Account
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "20px",
              marginTop: "40px"
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                padding: "20px",
                borderRadius: "12px"
              }}
            >
              <h3>Email</h3>
              <p>{user.email}</p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "20px",
                borderRadius: "12px"
              }}
            >
              <h3>Mobile</h3>
              <p>
                {user.mobile || "Not Available"}
              </p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "20px",
                borderRadius: "12px"
              }}
            >
              <h3>User ID</h3>
              <p
                style={{
                  wordBreak: "break-all"
                }}
              >
                {user._id}
              </p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                padding: "20px",
                borderRadius: "12px"
              }}
            >
              <h3>Account Status</h3>
              <p
                style={{
                  color: "green",
                  fontWeight: "600"
                }}
              >
                Active
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "40px"
            }}
          >
            <h2>Account Overview</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(200px,1fr))",
                gap: "20px",
                marginTop: "20px"
              }}
            >
              <div
                style={{
                  background: "#eff6ff",
                  padding: "25px",
                  borderRadius: "15px",
                  textAlign: "center"
                }}
              >
                <h3>Orders</h3>
                <h1>{orderCount}</h1>
              </div>

              <div
                style={{
                  background: "#f0fdf4",
                  padding: "25px",
                  borderRadius: "15px",
                  textAlign: "center"
                }}
              >
                <h3>Cart Items</h3>
                <h1>{cartCount}</h1>
              </div>

              <div
                style={{
                  background: "#faf5ff",
                  padding: "25px",
                  borderRadius: "15px",
                  textAlign: "center"
                }}
              >
                <h3>Member Since</h3>
                <h1>2025</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;