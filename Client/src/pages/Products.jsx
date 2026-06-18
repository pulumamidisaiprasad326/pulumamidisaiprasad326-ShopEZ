import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Products() {
  const location = useLocation();

  const queryParams = new URLSearchParams(
    location.search
  );

  const selectedCategory =
    queryParams.get("category");

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [category, setCategory] = useState(
    selectedCategory || "All"
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/all");

      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All"
          ? true
          : product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  const categories = [
    "All",
    "Mobiles",
    "Laptops",
    "Electronics",
    "Fashion",
    "Watches",
    "Footwear",
    "Home",
    "Beauty"
  ];

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
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            color: "#0f172a",
            marginBottom: "30px"
          }}
        >
          Explore Products
        </h1>

        {/* Search */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "25px"
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search Products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{
              width: "100%",
              maxWidth: "650px",
              padding: "16px 20px",
              borderRadius: "50px",
              border: "1px solid #e2e8f0",
              fontSize: "16px",
              outline: "none",
              background: "white",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.06)"
            }}
          />
        </div>

        {/* Categories */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "30px"
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setCategory(cat)
              }
              style={{
                padding: "10px 20px",
                borderRadius: "30px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                background:
                  category === cat
                    ? "#2563eb"
                    : "#e2e8f0",
                color:
                  category === cat
                    ? "white"
                    : "#0f172a"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "35px"
          }}
        >
          Showing {filteredProducts.length} Products
        </p>

        {/* Product Grid */}

        <div
          style={{
            maxWidth: "1400px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(280px,1fr))",
            gap: "25px"
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow:
                  "0 8px 25px rgba(0,0,0,0.08)",
                transition: "0.3s"
              }}
            >
              {/* Image */}

              <div
                style={{
                  background: "#f8fafc",
                  position: "relative",
                  padding: "20px"
                }}
              >
                {product.discount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      background: "#ef4444",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      fontSize: "13px"
                    }}
                  >
                    {product.discount}% OFF
                  </div>
                )}

                <img
                  src={`http://localhost:8000/uploads/${product.mainImg}`}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "contain"
                  }}
                />
              </div>

              {/* Details */}

              <div
                style={{
                  padding: "20px"
                }}
              >
                <h3
                  style={{
                    color: "#0f172a",
                    marginBottom: "10px"
                  }}
                >
                  {product.title}
                </h3>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    minHeight: "45px"
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    color: "#f59e0b",
                    marginBottom: "10px"
                  }}
                >
                  ⭐⭐⭐⭐⭐
                </div>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px"
                  }}
                >
                  {product.category}
                </p>

                <h2
                  style={{
                    color: "#2563eb",
                    marginTop: "10px"
                  }}
                >
                  ₹{product.price}
                </h2>

                <p
                  style={{
                    color: "#16a34a",
                    fontWeight: "600"
                  }}
                >
                  🚚 Free Delivery
                </p>

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
                      marginTop: "15px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#2563eb",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "600"
                    }}
                  >
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;