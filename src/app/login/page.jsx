"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";  // ใช้ useRouter เพื่อเปลี่ยนหน้า

export default function Page() {
  const [data, setData] = useState(""); // Stores the server response
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
 // ใช้ router ในการเปลี่ยนหน้า

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!username || !password) {
      setData("กรุณากรอกข้อมูลให้ครบถ้วน"); // Display error message in Thai
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("https://longin.myads.dev/login", requestOptions);
      const result = await response.json(); // Assuming the server returns a JSON object with a token or status

      if (response.ok) {
        // Save the login status (e.g., token or username) to localStorage
        localStorage.setItem("token", result.token);  // Assume the server returns a token
        localStorage.setItem("username", username);  // You can store the username or other info if needed
        
        // Redirect to the profile page
        window.location.href='Profile';
      } else {
        setData(result.message || "เกิดข้อผิดพลาดในการล็อกอิน");
      }
    } catch (error) {
      console.error(error);
      setData("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };

  return (
    <div className="container mt-5">
      <div>{data && <div>{data}</div>}</div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            ชื่อผู้ใช้
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="กรอกชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            รหัสผ่าน
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mb-5">
          เข้าสู่ระบบ
        </button>
      </form>

      <div className="text-center mt-5">
        <a href="/singup"  >
        ลงทะเบียน
        </a>
      </div>
    </div>
  );
}
