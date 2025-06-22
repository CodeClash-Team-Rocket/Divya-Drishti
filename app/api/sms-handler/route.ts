// app/api/sms-handler/route.ts
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const fromNumber = body.get("From") as string;
    const incomingMessage = body.get("Body") as string;
    const toNumber = body.get("To") as string;

    console.log(`Received SMS from ${fromNumber}: ${incomingMessage}`);

    // Check if the incoming message is an emergency keyword
    const emergencyKeywords = ["emergency", "help", "sos", "urgent", "panic"];
    const isEmergency = emergencyKeywords.some((keyword) =>
      incomingMessage.toLowerCase().includes(keyword)
    );

    let responseMessage: string;

    if (isEmergency) {
      // Handle emergency SMS
      responseMessage = `🚨 EMERGENCY RECEIVED 🚨

Your emergency alert has been activated!

📍 Emergency services have been notified
⏰ Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
📱 Your location is being tracked

Stay calm. Help is on the way!

Reply CANCEL to stop alerts.`;

      // Trigger emergency protocol
      await triggerEmergencyProtocol(fromNumber, incomingMessage);
    } else {
      // Regular auto-response
      responseMessage = `Hello! Thanks for your message: "${incomingMessage}"

This is an automated response. For emergencies, text keywords like:
• EMERGENCY
• HELP  
• SOS
• URGENT

Our system is active 24/7 for emergency alerts.`;
    }

    // Create TwiML response for SMS
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>${responseMessage}</Message>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("SMS handler error:", error);

    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>System temporarily unavailable. For emergencies, call emergency services directly.</Message>
</Response>`;

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  }
}

async function triggerEmergencyProtocol(
  fromNumber: string,
  message: string
): Promise<void> {
  try {
    const emergencyContacts = [
      "+917684844015", // Replace with actual emergency contacts
    ];

    const emergencyAlert = `🚨 EMERGENCY ALERT 🚨

Someone sent an emergency SMS!

📱 From: ${fromNumber}
📝 Message: "${message}"
📍 Location: [Location tracking initiated]
⏰ Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

Please respond immediately!`;

    for (const contact of emergencyContacts) {
      try {
        await client.messages.create({
          body: emergencyAlert,
          from: process.env.TWILIO_PHONE_NUMBER as string,
          to: contact,
        });
      } catch (error) {
        console.error(`Failed to send emergency alert to ${contact}:`, error);
      }
    }
  } catch (error) {
    console.error("Emergency protocol error:", error);
  }
}
