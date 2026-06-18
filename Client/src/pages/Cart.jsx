import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

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

  const updateQuantity = async (
    id,
    quantity
  ) => {
    if (quantity < 1) return;

    try {
      const token =
        localStorage.getItem("token");

      await API.put(
        `/cart/update/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await API.delete(
        `/cart/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px"
      }}
    >
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Your Cart Is Empty</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "20px",
                marginBottom: "20px",
                background: "#fff",
                borderRadius: "10px",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.08)"
              }}
            >
              <img
                src={`http://localhost:8000/uploads/${item.mainImg}`}
                alt={item.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain"
                }}
              />

              <div style={{ flex: 1 }}>
                <h3>{item.title}</h3>

                <p>₹ {item.price}</p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px"
                  }}
                >
                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity - 1
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  removeItem(item._id)
                }
                style={{
                  padding: "10px 20px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div
            style={{
              textAlign: "right",
              marginTop: "30px"
            }}
          >
            <h2>
              Total: ₹ {totalPrice}
            </h2>

            <button
              onClick={() =>
                navigate("/checkout")
              }
              style={{
                padding: "12px 30px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;