"use client";

import QRCode from "qrcode.react";
import { useState, useEffect } from "react";
import generatePayload from "promptpay-qr";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [qrCode, setQrCode] = useState("");

  // Load cart data from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Calculate total and generate QR code when cart items change
  useEffect(() => {
    try {
      const totalAmount = cartItems.reduce((sum, item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);

        if (isNaN(price) || isNaN(quantity)) {
          console.error("Invalid price or quantity:", item);
          throw new Error("Invalid price or quantity.");
        }

        return sum + price * quantity;
      }, 0);

      setTotal(totalAmount);

      // Generate PromptPay QR code (replace "0912345678" with the PromptPay number)
      const payload = generatePayload("0912345678", { amount: totalAmount });
      setQrCode(payload);
    } catch (error) {
      console.error("Error calculating total:", error);
    }
  }, [cartItems]);

  // Remove item from cart
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cartbox">
          <div className="cartb">
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  marginBottom: "20px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "10px",
                }}
              >
                <p>{item.name}</p>
                <p>Price per item: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>

                <div className="btn" style={{ marginTop: "10px" }}>
                  <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}

            <div className="text-center" style={{ marginTop: "20px" }}>
              <h3>Total: ${total.toFixed(2)}</h3>
              <p>Scan the QR code below to make a payment</p>
              {qrCode && <QRCode value={qrCode} size={200} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
