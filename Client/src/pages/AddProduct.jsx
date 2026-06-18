import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainImg: "",
    category: "",
    price: "",
    discount: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/product/add",
        {
          ...formData,
          price: Number(formData.price),
          discount: Number(formData.discount || 0)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Product Added Successfully");

      setFormData({
        title: "",
        description: "",
        mainImg: "",
        category: "",
        price: "",
        discount: ""
      });

      navigate("/admin/products");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed To Add Product"
      );
    }
  };

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
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)"
        }}
      >
        <h1
          style={{
            marginBottom: "25px"
          }}
        >
          Add Product
        </h1>

        <form onSubmit={addProduct}>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{
              ...inputStyle,
              height: "120px"
            }}
          />

          <input
            type="text"
            name="mainImg"
            placeholder="Image Name (iphone16.jpg)"
            value={formData.mainImg}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">
              Select Category
            </option>

            <option value="Mobiles">
              Mobiles
            </option>

            <option value="Laptops">
              Laptops
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Fashion">
              Fashion
            </option>

            <option value="Accessories">
              Accessories
            </option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={formData.discount}
            onChange={handleChange}
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#22c55e",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "16px",
  boxSizing: "border-box"
};

export default AddProduct;