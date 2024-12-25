import React, { useState } from "react";
import styles from './Login.module.css';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // Để hiển thị lỗi (nếu có)
  const navigate = useNavigate(); // Hook chuyển hướng

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước khi gửi

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // Đăng nhập thành công
        console.log("dang nhap thanh cong roi do :", data);
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data)); // Lưu token (nếu có)
        alert("Login successful!");
        navigate("/");
      } else {
        // Đăng nhập thất bại
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
