"use client";

import React, { useEffect, useState } from "react";
 

export default function ProfilePage() {
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if (!token) {
      // ถ้าไม่มี token ให้ redirect ไปที่หน้า login
      router.push("/login");
    } else {
      // ถ้ามี token ก็แสดงข้อมูลผู้ใช้ที่ล็อกอินแล้ว
      const username = localStorage.getItem("username");
      setUser(username);
    }
  }, []);

  return (
    <div className="container mt-5">
      {user ? (
        <h1>ยินดีต้อนรับ, {user}</h1>
      ) : (
        <p>กำลังโหลดข้อมูล...</p>
      )}
    </div>
  );
}
