import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!token || !user) {
        alert("Please Login First");
        navigate("/login");
        return;
      }

      await API.post(
        "/cart/add",
        {
          userId: user._id,
          title: product.title,
          description: product.description,
          mainImg: product.mainImg,
          price: product.price,
          discount: product.discount || 0,
          quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Item Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Item");
    }
  };

  const buyNow = async () => {
    await addToCart();
    navigate("/cart");
  };

  if (!product) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px"
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "40px 20px"
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "auto",
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.08)"
          }}
        >
          {/* IMAGE */}

          <div
            style={{
              flex: 1,
              minWidth: "300px",
              background: "#f8fafc",
              borderRadius: "20px",
              padding: "30px"
            }}
          >
            <img
              src={`http://localhost:8000/uploads/${product.mainImg}`}
              alt={product.title}
              style={{
                width: "100%",
                maxHeight: "450px",
                objectFit: "contain"
              }}
            />
          </div>

          {/* DETAILS */}

          <div
            style={{
              flex: 1,
              minWidth: "300px"
            }}
          >
            <h1
              style={{
                color: "#0f172a"
              }}
            >
              {product.title}
            </h1>

            <div
              style={{
                color: "#f59e0b",
                fontSize: "18px",
                marginTop: "10px"
              }}
            >
              ⭐⭐⭐⭐⭐ (4.8)
            </div>

            <p
              style={{
                color: "#64748b",
                marginTop: "10px"
              }}
            >
              Category: {product.category}
            </p>

            {product.discount > 0 && (
              <div
                style={{
                  background: "#ef4444",
                  color: "white",
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  marginTop: "15px"
                }}
              >
                {product.discount}% OFF
              </div>
            )}

            <h2
              style={{
                color: "#2563eb",
                marginTop: "20px"
              }}
            >
              ₹ {product.price}
            </h2>

            <p
              style={{
                color: "#16a34a",
                fontWeight: "600"
              }}
            >
              🚚 Free Delivery
            </p>

            <p
              style={{
                color: "#16a34a",
                fontWeight: "600"
              }}
            >
              🔄 7 Days Easy Return
            </p>

            <p
              style={{
                color: "#2563eb",
                fontWeight: "600"
              }}
            >
              🔒 Secure Payment
            </p>

            <p
              style={{
                marginTop: "20px",
                lineHeight: "1.8",
                color: "#475569"
              }}
            >
              {product.description}
            </p>

            {/* QUANTITY */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "25px"
              }}
            >
              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
                style={{
                  width: "40px",
                  height: "40px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                -
              </button>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600"
                }}
              >
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
              >
                +
              </button>
            </div>

            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                gap: "15px",
                marginTop: "30px",
                flexWrap: "wrap"
              }}
            >
              <button
                onClick={addToCart}
                style={{
                  padding: "14px 30px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Add To Cart
              </button>

              <button
                onClick={buyNow}
                style={{
                  padding: "14px 30px",
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCT DETAILS */}

        <div
          style={{
            maxWidth: "1300px",
            margin: "30px auto",
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.08)"
          }}
        >
          <h2>Product Details</h2>

          <hr />

          <p>
            <strong>Category:</strong>{" "}
            {product.category}
          </p>

          <p>
            <strong>Price:</strong> ₹
            {product.price}
          </p>

          <p>
            <strong>Discount:</strong>{" "}
            {product.discount || 0}%
          </p>

          <p>
            <strong>Description:</strong>
          </p>

          <p>{product.description}</p>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;