import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Address() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    fetchAddresses();
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addAddress = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/address/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Address Added Successfully");

      setForm({
        fullName: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
      });

      fetchAddresses();

      setTimeout(() => {
        navigate("/checkout");
      }, 1000);

    } catch (error) {
      console.log(error);
      alert("Failed To Add Address");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "30px auto",
          padding: "20px",
          minHeight: "100vh",
          background: "#f8fafc"
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            color: "#0f172a"
          }}
        >
          Add Address
        </h1>

        <form
          onSubmit={addAddress}
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "15px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.08)"
          }}
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            style={inputStyle}
          />

          <textarea
            name="address"
            placeholder="House No, Street, Area"
            value={form.address}
            onChange={handleChange}
            required
            style={{
              ...inputStyle,
              height: "100px"
            }}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Save Address
          </button>
        </form>

        <h2
          style={{
            marginTop: "40px",
            color: "#0f172a"
          }}
        >
          My Addresses
        </h2>

        {addresses.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "15px"
            }}
          >
            No Address Found
          </div>
        ) : (
          addresses.map((item) => (
            <div
              key={item._id}
              style={{
                background: "#fff",
                padding: "20px",
                marginTop: "15px",
                borderRadius: "12px",
                boxShadow:
                  "0 5px 15px rgba(0,0,0,0.08)"
              }}
            >
              <h3>{item.fullName}</h3>

              <p>{item.mobile}</p>

              <p>{item.address}</p>

              <p>
                {item.city}, {item.state}
              </p>

              <p>{item.pincode}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "15px"
};

export default Address;