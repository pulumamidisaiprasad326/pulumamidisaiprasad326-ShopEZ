import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainImg: "",
    category: "",
    price: "",
    discount: ""
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/product/${id}`);

      setFormData({
        title: res.data.product.title || "",
        description: res.data.product.description || "",
        mainImg: res.data.product.mainImg || "",
        category: res.data.product.category || "",
        price: res.data.product.price || "",
        discount: res.data.product.discount || ""
      });

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/product/update/${id}`,
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

      alert("Product Updated Successfully");

      navigate("/admin/products");

    } catch (error) {
      console.log(error);
      alert("Failed To Update Product");
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
        <h1>Edit Product</h1>

        <form onSubmit={updateProduct}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            style={inputStyle}
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            style={{
              ...inputStyle,
              height: "120px"
            }}
          />

          <input
            type="text"
            name="mainImg"
            value={formData.mainImg}
            onChange={handleChange}
            placeholder="Image Name"
            style={inputStyle}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Mobiles">Mobiles</option>
            <option value="Laptops">Laptops</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Accessories">Accessories</option>
          </select>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            style={inputStyle}
          />

          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Discount"
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Update Product
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

export default EditProduct;