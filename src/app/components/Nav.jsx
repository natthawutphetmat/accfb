"use client";

import React from 'react'
import { useSession, signOut } from 'next-auth/react';


export default function Nav() {

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



   
        <span className="navbar-text">

{session ? (
  <div className='d-flex'>

 <div className='mx-5'>
 <div><img src="/img/user.png" width={50} alt="user" />  </div>
 <div className='text-center' >{session.user.name}</div>
 </div>
 <div className='mx-5'>
  <button onClick={() => signOut()} className='btn btn-outline-danger'>ออก</button>
  </div>
  </div>  
):(


  <>
  

  <a href="/singup" className='btn btn-danger'>ลงทะเบียน</a> 
  
  
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
