// pages/api/trigger-emergency.ts (Optional - for triggering from frontend)
// OR app/api/trigger-emergency/route.ts for App Router

import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

interface RequestBody {
  emergencyContact?: string;
  userLocation?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  callSid?: string;
  smsSid?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { emergencyContact, userLocation }: RequestBody = req.body;

    // Hardcoded location for hackathon demo
    const location =
      userLocation || "123 Main Street, Downtown Mumbai, Maharashtra";

    // Make emergency call
    const call = await client.calls.create({
      twiml: `<Response>
        <Say voice="alice">Emergency alert! Someone at ${location} needs immediate help. This is an automated emergency call. Please respond quickly.</Say>
        <Pause length="2"/>
        <Say voice="alice">Location: ${location}. Time: ${new Date().toLocaleString()}. Please send assistance.</Say>
      </Response>`,
      to: emergencyContact || "+917684844015", // Emergency contact number
      from: process.env.TWILIO_PHONE_NUMBER!,
    });

    // Send emergency SMS
    const smsMessage = `🚨 EMERGENCY ALERT 🚨
    
Someone needs help urgently!

📍 Location: ${location}
⏰ Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
📱 System: Automated Emergency Alert

Please respond immediately!`;

    const sms = await client.messages.create({
      body: smsMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: emergencyContact || "+919876543210",
    });

    res.status(200).json({
      success: true,
      message: "Emergency alert sent successfully",
      callSid: call.sid,
      smsSid: sms.sid,
    });
  } catch (error: any) {
    console.error("Emergency trigger error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send emergency alert",
      error: error.message,
    });
  }
}
