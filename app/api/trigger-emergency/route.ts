import { NextRequest, NextResponse } from "next/server";
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

// CORS headers - allow all origins (including localhost:3000)
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(),
  });
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<ApiResponse>> {
  
  try {
    const body: RequestBody = await req.json();
    const { emergencyContact, userLocation } = body;

    console.log("Emergency trigger request:", body);
    console.log("Environment check:", {
      hasSid: !!process.env.TWILIO_ACCOUNT_SID,
      hasToken: !!process.env.TWILIO_AUTH_TOKEN,
      hasPhone: !!process.env.TWILIO_PHONE_NUMBER,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    });

    // Use the actual user location passed from frontend
    const location = userLocation || "Location not available - emergency contact needed";
    const contactNumber = emergencyContact || "+917684844015";

    // Format current time in IST
    const currentTime = new Date().toLocaleString("en-IN", { 
      timeZone: "Asia/Kolkata",
      hour12: true,
      dateStyle: 'short',
      timeStyle: 'short'
    });

    const twimlContent = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">Emergency alert activated. Someone at the following location needs immediate help: ${location}. This is an automated emergency call from the emergency response system.</Say>
    <Pause length="2"/>
    <Say voice="alice">Emergency location is: ${location}. Time of alert is ${currentTime}. Please send assistance immediately.</Say>
    <Pause length="1"/>
    <Say voice="alice">This message will repeat. Emergency location is: ${location}. Please respond as soon as possible.</Say>
</Response>`;

    console.log("TwiML being sent:", twimlContent);

    // Make the emergency call
    const call = await client.calls.create({
      twiml: twimlContent,
      to: contactNumber,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });

    // Create emergency SMS with actual location
    const smsMessage = `🚨 EMERGENCY ALERT 🚨

Someone needs immediate help!

📍 Location: ${location}
⏰ Time: ${currentTime}
🆘 Please respond immediately!

This is an automated emergency alert.`;

    console.log("Sending SMS to:", contactNumber);
    console.log("From number:", process.env.TWILIO_PHONE_NUMBER);
    console.log("SMS message:", smsMessage);
    console.log("SMS message length:", smsMessage.length);

    // Send emergency SMS
    const sms = await client.messages.create({
      body: smsMessage,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: contactNumber,
    });

    console.log("SMS sent successfully:", sms.sid);
    console.log("Call initiated successfully:", call.sid);

    return NextResponse.json(
      {
        success: true,
        message: "Emergency alert sent successfully",
        callSid: call.sid,
        smsSid: sms.sid,
      },
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error: any) {
    console.error("Emergency trigger error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send emergency alert",
        error: error.message,
      },
      {
        status: 500,
        headers: corsHeaders(),
      }
    );
  }
}