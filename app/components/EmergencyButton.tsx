// components/EmergencyButton.tsx
"use client";
import React, { useState } from "react";

interface EmergencyResponse {
  success: boolean;
  message: string;
  callSid?: string;
  smsSid?: string;
  error?: string;
}

interface EmergencyRequest {
  emergencyContact: string;
  userLocation: string;
}

export default function EmergencyButton() {
  const [isTriggering, setIsTriggering] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const triggerEmergency = async (): Promise<void> => {
    setIsTriggering(true);
    setStatus("Sending emergency alert...");

    try {
      const requestData: EmergencyRequest = {
        emergencyContact: "+919876543210", // Replace with actual contact
        userLocation: "Sector 15, Gurugram, Haryana", // Hardcoded for demo
      };

      const response = await fetch("/api/trigger-emergency", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data: EmergencyResponse = await response.json();

      if (data.success) {
        setStatus("✅ Emergency alert sent successfully!");
      } else {
        setStatus("❌ Failed to send emergency alert");
      }
    } catch (error: any) {
      setStatus("❌ Error: " + error.message);
    } finally {
      setIsTriggering(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Emergency Alert System
        </h1>

        <p className="text-gray-600 mb-6">
          Press the button below to trigger an emergency call and SMS
        </p>

        <button
          onClick={triggerEmergency}
          disabled={isTriggering}
          className={`
            px-8 py-4 rounded-full text-white font-bold text-xl
            transition-all duration-200 transform
            ${
              isTriggering
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95"
            }
          `}
        >
          {isTriggering ? "⏳ Sending..." : "🚨 EMERGENCY"}
        </button>

        {status && (
          <div className="mt-4 p-3 rounded-lg bg-gray-50">
            <p className="text-sm">{status}</p>
          </div>
        )}

        <div className="mt-6 text-xs text-gray-500">
          <p>Demo Mode: Hardcoded location</p>
          <p>Location: Sector 15, Gurugram, Haryana</p>
        </div>
      </div>
    </div>
  );
}
