import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaUserCircle
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        style={{
          background: "#0f172a",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.15)"
        }}
      >
        {/* LOGO */}

        <Link
          to="/"
          style={{
            textDecoration: "none"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <img
              src="/logo.png"
              alt="logo"
              style={{
                width: "50px",
                height: "50px"
              }}
            />

            <h1
              style={{
                color: "white",
                margin: 0,
                fontSize: "34px"
              }}
            >
              ShopEZ
            </h1>
          </div>
        </Link>

        {/* DESKTOP MENU */}

        <div className="desktop-menu">
          <Link style={linkStyle} to="/">
            Home
          </Link>

          <Link
            style={linkStyle}
            to="/products"
          >
            Products
          </Link>

          <Link
            style={linkStyle}
            to="/orders"
          >
            Orders
          </Link>

          <Link
            style={linkStyle}
            to="/address"
          >
            Address
          </Link>

          <Link
            style={linkStyle}
            to="/profile"
          >
            Profile
          </Link>

          <Link
            style={linkStyle}
            to="/cart"
          >
            <FaShoppingCart />
            <span
              style={{
                marginLeft: "5px"
              }}
            >
              Cart
            </span>
          </Link>

          {user?.usertype === "admin" && (
            <Link
              to="/admin"
              style={{
                ...linkStyle,
                color: "#60a5fa"
              }}
            >
              Admin Dashboard
            </Link>
          )}

          {user ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#cbd5e1",
                  fontWeight: "600"
                }}
              >
                <FaUserCircle />
                {user.username}
              </div>

              <button
                onClick={logout}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding:
                    "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                background: "#2563eb",
                color: "white",
                textDecoration: "none",
                padding:
                  "10px 18px",
                borderRadius: "8px",
                fontWeight: "600"
              }}
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE ICON */}

        <div
          className="mobile-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          style={{
            color: "white",
            fontSize: "24px",
            cursor: "pointer"
          }}
        >
          {menuOpen ? (
            <FaTimes />
          ) : (
            <FaBars />
          )}
        </div>
      </nav>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: 0,
            width: "100%",
            background: "#0f172a",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            zIndex: 999
          }}
        >
          <Link
            to="/"
            style={mobileLink}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/products"
            style={mobileLink}
            onClick={closeMenu}
          >
            Products
          </Link>

          <Link
            to="/cart"
            style={mobileLink}
            onClick={closeMenu}
          >
            Cart
          </Link>

          <Link
            to="/orders"
            style={mobileLink}
            onClick={closeMenu}
          >
            Orders
          </Link>

          <Link
            to="/address"
            style={mobileLink}
            onClick={closeMenu}
          >
            Address
          </Link>

          <Link
            to="/profile"
            style={mobileLink}
            onClick={closeMenu}
          >
            Profile
          </Link>

          {user?.usertype === "admin" && (
            <Link
              to="/admin"
              style={mobileLink}
              onClick={closeMenu}
            >
              Admin Dashboard
            </Link>
          )}

          {user && (
            <button
              onClick={() => {
                closeMenu();
                logout();
              }}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  marginRight: "20px",
  display: "inline-flex",
  alignItems: "center"
};

const mobileLink = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600"
};

export default Navbar;