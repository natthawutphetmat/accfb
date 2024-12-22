import React from 'react'

export default function Nav() {
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

        <div className="btn btn-danger rounded-5 h4">    10    </div>

    <img src="/img/cart.png" width={40} alt="logo" className='mx-3' />
    </div>
  </div>
</nav>
      
    </>
  )
}
