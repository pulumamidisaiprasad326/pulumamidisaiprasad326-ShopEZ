import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchAddresses();
    fetchCart();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/address/my", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAddresses(res.data.addresses || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await API.get(
        `/cart/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setCartItems(
        res.data.cartItems || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Select Address");
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      for (const item of cartItems) {
        await API.post(
          "/order/place",
          {
            userId: user._id,

            name:
              selectedAddress.fullName,

            email: user.email,

            mobile:
              selectedAddress.mobile,

            address:
              selectedAddress.address,

            city:
              selectedAddress.city,

            state:
              selectedAddress.state,

            pincode:
              selectedAddress.pincode,

            title: item.title,
            description:
              item.description,
            mainImg: item.mainImg,

            quantity:
              item.quantity,

            price: item.price,

            paymentMethod: "COD",

            orderStatus: "Pending"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      alert(
        "Order Placed Successfully"
      );

      navigate("/orders");

    } catch (error) {
      console.log(error);
      alert("Order Failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px"
      }}
    >
      <h1>Checkout</h1>

      <h2>Select Address</h2>

      {addresses.length === 0 ? (
        <p>No Address Found</p>
      ) : (
        addresses.map((address) => (
          <div
            key={address._id}
            onClick={() =>
              setSelectedAddress(address)
            }
            style={{
              border:
                selectedAddress?._id ===
                address._id
                  ? "2px solid #2563eb"
                  : "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            <h4>
              {address.fullName}
            </h4>

            <p>
              {address.address},
              {address.city},
              {address.state}
            </p>

            <p>
              {address.mobile}
            </p>
          </div>
        ))
      )}

      <h2 style={{ marginTop: "30px" }}>
        Order Summary
      </h2>

      {cartItems.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "10px"
          }}
        >
          <span>
            {item.title} ×{" "}
            {item.quantity}
          </span>

          <span>
            ₹
            {item.price *
              item.quantity}
          </span>
        </div>
      ))}

      <h2>
        Total : ₹ {totalAmount}
      </h2>

      <button
        onClick={placeOrder}
        style={{
          padding: "14px 30px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Place Order (COD)
      </button>
    </div>
  );
}

export default Checkout;