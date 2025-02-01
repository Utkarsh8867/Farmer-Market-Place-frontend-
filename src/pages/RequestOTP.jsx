import React, { useState } from "react";

const RequestOTP = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleRequestOTP = async (e) => {
    e.preventDefault();

    if (!phone) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    if (phone.length !== 10 || !/^[0-9]+$/.test(phone)) {
      setMessage("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || "Failed to request OTP.");
      }
    } catch (error) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-800 to-yellow-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-semibold mb-6">Request OTP</h1>
        <form onSubmit={handleRequestOTP} className="flex flex-col">
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-green-500"
          />
          <button
            type="submit"
            className="p-3 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
          >
            Request OTP
          </button>
        </form>
        {message && (
          <p className="mt-4 text-red-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default RequestOTP;
