import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/all");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Product Deleted");
      fetchProducts();

    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f5f7fb",
        minHeight: "100vh"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >
        <h1>Manage Products</h1>

        <button
          onClick={() =>
            navigate("/admin/add-product")
          }
          style={{
            background: "#22c55e",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          + Add Product
        </button>
      </div>

      {products.map((product) => (
        <div
          key={product._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            background: "white",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            boxShadow:
              "0 3px 10px rgba(0,0,0,0.08)"
          }}
        >
          <img
            src={`/images/${product.mainImg}`}
            alt={product.title}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "contain"
            }}
          />

          <div style={{ flex: 1 }}>
            <h3>{product.title}</h3>
            <p>₹ {product.price}</p>
            <p>{product.category}</p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px"
            }}
          >
            <button
              onClick={() =>
                navigate(
                  `/admin/edit-product/${product._id}`
                )
              }
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteProduct(product._id)
              }
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;