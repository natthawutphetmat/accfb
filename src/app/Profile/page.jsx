"use client";

import React, { useEffect, useState } from "react";
 


export default function ProfilePage() {

 
  const [user, setUser] = useState(null);
  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if (!token) {
  
      window.location="/login";
    } else {
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
