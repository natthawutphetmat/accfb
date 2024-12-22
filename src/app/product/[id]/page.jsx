"use client"


import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import './cart.css';

export default function ProductPage({ params }) {


  
  const productId = parseInt(params.id);  // ดึง id จาก params



  const [product, setProduct] = useState(null); // เก็บข้อมูลสินค้า
  const [quantity, setQuantity] = useState(1);  // จัดการจำนวนสินค้า
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล

  const router = useRouter();

  // การดึงข้อมูลสินค้า
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://apifb.myad-dev.com/get/${productId}`);
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = cartItems.findIndex(item => item.id === product.id);

    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    router.push("/cart");
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading) return <p>Loading...</p>;

  if (!product) {
    return <p>Product not found</p>;
  }

  return (

<>

<div className="text-center">
<div className="product">


      <img src='/img/fblogo.png' alt='facebook ads logo' width='100%'  />



      <div className="product-title">{product.title}</div>


      <div className="product-description">{product.description}</div>
      <div className="product-price">${product.price}</div>
      
      <div className="product-quantity">
        <button onClick={decreaseQuantity} className="quantity-button">-</button>
        <span className="quantity-display">{quantity}</span>
        <button onClick={increaseQuantity} className="quantity-button">+</button>
      </div>

      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add 
      </button>
    </div>

</div>

</>

 
  );
}
