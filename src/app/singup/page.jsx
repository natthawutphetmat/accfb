"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState(""); // เก็บ username ที่ผู้ใช้กรอก
  const [password, setPassword] = useState(""); // เก็บ password ที่ผู้ใช้กรอก
  const [confirmPassword, setConfirmPassword] = useState(""); // เก็บ confirm password
  const [message, setMessage] = useState(""); // เก็บข้อความตอบกลับจากเซิร์ฟเวอร์
  const [error, setError] = useState(""); // เก็บข้อความแสดงข้อผิดพลาด

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกัน
    if (password !== confirmPassword) {
      setError("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน!");
      setMessage(""); // เคลียร์ข้อความสำเร็จ
      return;
    }

    try {
      const response = await fetch("https://longin.myads.dev//register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // ตรวจสอบสถานะการตอบกลับ
        const errorData = await response.json();
        setError(errorData.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
        setMessage(""); // เคลียร์ข้อความสำเร็จ
      } else {
        const data = await response.json();
        setMessage(data.message || "สมัครสมาชิกสำเร็จ");
        setError(""); // เคลียร์ข้อผิดพลาด
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      setMessage(""); // เคลียร์ข้อความสำเร็จ
    }
  };

  return (
    <div className="container mt-5">
      <h2>สมัครสมาชิก</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
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
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            ยืนยันรหัสผ่าน
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="ยืนยันรหัสผ่าน"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-5">
          สมัครสมาชิก
        </button>
       
      </form>



     <div className="text-center mt-5" > 
      
      <a href="/login"  >เข้าสู่ระบบ</a>
       </div>

    </div>
  );
}
