"use client";
import QRCode from 'qrcode.react';
import generatePayload from 'promptpay-qr';
import { useState, useEffect, useCallback } from "react";

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PROMPTPAY_PHONE_NUMBER; // ดึงเบอร์โทรศัพท์จาก environment variable

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [qrCode, setQrCode] = useState("");
    const [loading, setLoading] = useState(true); // เพิ่ม loading state
    const [error, setError] = useState(null); // เพิ่ม error state

    useEffect(() => {
        try {
            const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(storedCart);
        } catch (err) {
            setError("Failed to load cart data.");
            console.error("Error loading cart from local storage:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        try {
            const totalAmount = cartItems.reduce((sum, item) => {
                const price = Number(item.price);
                const quantity = Number(item.quantity);
                if (isNaN(price) || isNaN(quantity)) {
                    throw new Error("Invalid price or quantity.");
                }
                return sum + price * quantity;
            }, 0);

            setTotal(totalAmount);

            if (typeof totalAmount === 'number' && totalAmount > 0) {
                if (!PHONE_NUMBER) {
                  throw new Error("PromptPay phone number is not defined.");
                }
                const payload = generatePayload({
                    phone: PHONE_NUMBER,
                    amount: totalAmount,
                });
                setQrCode(payload);
            } else {
                setQrCode(""); // เคลียร์ QR Code หากยอดรวมไม่ถูกต้อง
            }
        } catch (err) {
            setError(err.message || "An error occurred.");
            console.error("Error generating QR code:", err);
            setQrCode(""); // เคลียร์ QR Code ในกรณีเกิด error
        }
    }, [cartItems]);

    const handleRemoveItem = useCallback((id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }, [cartItems]);

    if (loading) {
        return <div>Loading cart...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            {/* ... (ส่วนแสดงผลเหมือนเดิม) */}
        </div>
    );
}