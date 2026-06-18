import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";

function Home() {
  const navigate = useNavigate();

  const [featuredProducts, setFeaturedProducts] =
    useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await API.get("/product/all");

      setFeaturedProducts(
        res.data.products.slice(0, 4)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const categories = [
    { icon: "📱", name: "Mobiles" },
    { icon: "💻", name: "Laptops" },
    { icon: "🎧", name: "Electronics" },
    { icon: "👕", name: "Fashion" },
    { icon: "⌚", name: "Watches" },
    { icon: "👟", name: "Footwear" },
    { icon: "🏠", name: "Home" },
    { icon: "💄", name: "Beauty" }
  ];

  return (
    <>
      <Navbar />

      <div
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "0 20px"
        }}
      >
        {/* HERO SECTION */}

        <div
          style={{
            maxWidth: "1400px",
            margin: "30px auto",
            background:
              "linear-gradient(135deg,#dbeafe,#ffffff)",
            borderRadius: "20px",
            padding: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "30px",
            boxShadow:
              "0 8px 25px rgba(0,0,0,0.08)"
          }}
        >
          <div>
            <span
              style={{
                background: "#facc15",
                padding: "8px 18px",
                borderRadius: "20px",
                fontWeight: "600"
              }}
            >
              BIG SAVING DAYS
            </span>

            <h1
              style={{
                fontSize: "55px",
                color: "#0f172a",
                marginTop: "20px",
                marginBottom: "15px",
                lineHeight: "1.1"
              }}
            >
              Best Deals On
              <br />
              Mobiles & Electronics
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "20px",
                marginBottom: "30px"
              }}
            >
              Up To 70% OFF On Top Brands
            </p>

            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "15px 35px",
                border: "none",
                borderRadius: "12px",
                background: "#2563eb",
                color: "white",
                fontSize: "18px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              🛍 Shop Now
            </button>
          </div>

          <img
            src="/logo.png"
            alt="ShopEZ Logo"
            style={{
              width: "220px",
              height: "220px",
              objectFit: "contain"
            }}
          />
        </div>

        {/* CATEGORIES */}

        <div
          style={{
            maxWidth: "1400px",
            margin: "30px auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(150px,1fr))",
            gap: "18px"
          }}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() =>
                navigate(
                  `/products?category=${category.name}`
                )
              }
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
                fontWeight: "600",
                boxShadow:
                  "0 3px 10px rgba(0,0,0,0.08)",
                cursor: "pointer"
              }}
            >
              <div
                style={{
                  fontSize: "32px",
                  marginBottom: "10px"
                }}
              >
                {category.icon}
              </div>

              <div>{category.name}</div>
            </div>
          ))}
        </div>

        {/* FEATURES */}

        <div
          style={{
            maxWidth: "1400px",
            margin: "20px auto",
            background: "white",
            borderRadius: "15px",
            padding: "25px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            boxShadow:
              "0 3px 10px rgba(0,0,0,0.08)"
          }}
        >
          <div>
            <h3>🚚 Free Delivery</h3>
            <p>On Orders Above ₹499</p>
          </div>

          <div>
            <h3>🔄 Easy Returns</h3>
            <p>Within 7 Days</p>
          </div>

          <div>
            <h3>🔒 Secure Payments</h3>
            <p>100% Protected</p>
          </div>

          <div>
            <h3>💰 Best Prices</h3>
            <p>Guaranteed</p>
          </div>

          <div>
            <h3>🎧 24/7 Support</h3>
            <p>Dedicated Support</p>
          </div>
        </div>

        {/* OFFERS */}

        <div
          style={{
            maxWidth: "1400px",
            margin: "30px auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px"
          }}
        >
          <div
            onClick={() =>
              navigate("/products?category=Fashion")
            }
            style={{
              background: "#dcfce7",
              padding: "30px",
              borderRadius: "15px",
              cursor: "pointer"
            }}
          >
            <h2>Fashion Sale</h2>
            <p>Up To 60% OFF</p>
            <strong>Shop Now →</strong>
          </div>

          <div
            onClick={() =>
              navigate("/products?category=Laptops")
            }
            style={{
              background: "#fef3c7",
              padding: "30px",
              borderRadius: "15px",
              cursor: "pointer"
            }}
          >
            <h2>Laptop Deals</h2>
            <p>Up To 40% OFF</p>
            <strong>Shop Now →</strong>
          </div>

          <div
            onClick={() =>
              navigate("/products?category=Beauty")
            }
            style={{
              background: "#fce7f3",
              padding: "30px",
              borderRadius: "15px",
              cursor: "pointer"
            }}
          >
            <h2>Beauty Essentials</h2>
            <p>Starting ₹199</p>
            <strong>Shop Now →</strong>
          </div>
        </div>

        {/* FEATURED PRODUCTS */}

        <div
          style={{
            maxWidth: "1400px",
            margin: "40px auto"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            <h2>Featured Products</h2>

            <button
              onClick={() => navigate("/products")}
              style={{
                border: "none",
                background: "#2563eb",
                color: "white",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              View All
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: "20px"
            }}
          >
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                style={{
                  background: "white",
                  borderRadius: "15px",
                  padding: "20px",
                  boxShadow:
                    "0 4px 15px rgba(0,0,0,0.08)"
                }}
              >
                <img
                  src={`http://localhost:8000/uploads/${product.mainImg}`}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "contain"
                  }}
                />

                <h3>{product.title}</h3>

                <p
                  style={{
                    color: "#64748b"
                  }}
                >
                  {product.description}
                </p>

                <h2
                  style={{
                    color: "#2563eb"
                  }}
                >
                  ₹{product.price}
                </h2>

                <Link
                  to={`/product/${product._id}`}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <button
                    style={{
                      width: "100%",
                      padding: "12px",
                      marginTop: "10px",
                      border: "none",
                      borderRadius: "8px",
                      background: "#2563eb",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    View Product
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST SECTION */}

        <div
          style={{
            maxWidth: "1400px",
            margin: "30px auto",
            background: "white",
            borderRadius: "15px",
            padding: "30px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            textAlign: "center",
            boxShadow:
              "0 3px 10px rgba(0,0,0,0.08)"
          }}
        >
          <div>
            <h3>✔ Top Brands</h3>
            <p>100% Original Products</p>
          </div>

          <div>
            <h3>✔ Wide Range</h3>
            <p>Thousands Of Products</p>
          </div>

          <div>
            <h3>✔ Trusted</h3>
            <p>Happy Customers</p>
          </div>

          <div>
            <h3>✔ Hassle Free Shopping</h3>
            <p>Easy & Safe</p>
          </div>
        </div>
      </div>
      <div
  style={{
    maxWidth: "1400px",
    margin: "40px auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px"
  }}
>
  <div
    style={{
      background: "white",
      padding: "25px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow:
        "0 3px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h2>500+</h2>
    <p>Products</p>
  </div>

  <div
    style={{
      background: "white",
      padding: "25px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow:
        "0 3px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h2>100+</h2>
    <p>Customers</p>
  </div>

  <div
    style={{
      background: "white",
      padding: "25px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow:
        "0 3px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h2>50+</h2>
    <p>Orders</p>
  </div>

  <div
    style={{
      background: "white",
      padding: "25px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow:
        "0 3px 10px rgba(0,0,0,0.08)"
    }}
  >
    <h2>24/7</h2>
    <p>Support</p>
  </div>
</div>


      <Footer />
    </>
  );
}

export default Home;