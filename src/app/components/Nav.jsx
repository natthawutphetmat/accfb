"use client";

import { useSession, signOut } from 'next-auth/react';
import React, { useEffect, useState } from "react";

export default function Nav() {



 const [user, setUser] = useState(null);
 

  useEffect(() => {
    
    const token = localStorage.getItem("token");

    if (!token) {
  
       
    } else {
       const username = localStorage.getItem("username");
      setUser(username);
    }
  }, []);

  const { data: session, status } = useSession();

  return (
    <>

<nav className="navbar bg-primary">
  <div className="container-fluid">
   
        <img src="/img/logo.png" width={60} alt="logo" />
     
        <a className='home' href="/">Home</a>
    

    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-success" type="submit">Search</button>
    </form>
    <div className="cart d-flex">



   
        <span className="navbar-text  ">

{user ? (
 
 <h5 className="text-light mx-3"> {user} </h5>


 
):(


  <>
  

  <p href="/singup" className='btn btn-danger'>ลงทะเบียน</p> 
  
  
  </>
)


}


</span>
    </div>
  </div>
</nav>
      
    </>
  )
}
