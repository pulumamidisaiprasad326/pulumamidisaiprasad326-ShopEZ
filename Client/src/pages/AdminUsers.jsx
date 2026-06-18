import { useEffect, useState } from "react";
import API from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/user/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
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
      <h1
        style={{
          marginBottom: "30px"
        }}
      >
        Manage Users
      </h1>

      {users.length === 0 ? (
        <h2>No Users Found</h2>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            style={{
              background: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 3px 10px rgba(0,0,0,0.08)"
            }}
          >
            <h3>{user.username}</h3>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>User Type:</strong>{" "}
              {user.usertype}
            </p>

            <p>
              <strong>User ID:</strong>{" "}
              {user._id}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminUsers;