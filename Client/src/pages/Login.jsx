import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/login", {
        email,
        password
      });

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          width: "520px",
          padding: "45px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        {/* Logo */}

        <div
          style={{
            textAlign: "center"
          }}
        >
          <img
            src="/logo.png"
            alt="ShopEZ Logo"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              marginBottom: "10px"
            }}
          />
        </div>

        <h1
          style={{
            textAlign: "center",
            color: "#0f172a",
            marginBottom: "10px"
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "35px"
          }}
        >
          Login to continue shopping
        </p>

        <label>Email</label>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={inputStyle}
        />

        <label>Password</label>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            fontSize: "17px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#64748b"
          }}
        >
          Don't have an account?{" "}
          <span
            onClick={() =>
              navigate("/register")
            }
            style={{
              color: "#2563eb",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  marginTop: "8px",
  marginBottom: "20px",
  fontSize: "15px",
  boxSizing: "border-box"
};

export default Login;