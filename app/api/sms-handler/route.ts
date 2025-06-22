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

    const emergencyKeywords = ["emergency", "help", "sos", "urgent", "panic"];
    const isEmergency = emergencyKeywords.some((keyword) =>
      incomingMessage.toLowerCase().includes(keyword)
    );

    let responseMessage: string;

    if (isEmergency) {
      responseMessage = `🚨 EMERGENCY RECEIVED 🚨
Alert activated!
Time: ${new Date().toLocaleTimeString("en-IN")}
Help is coming. Stay calm.
Reply CANCEL to stop.`;

      await triggerEmergencyProtocol(fromNumber, incomingMessage);
    } else {
      responseMessage = `Thanks for your message: "${incomingMessage}"
For emergencies, text: EMERGENCY, HELP, SOS, URGENT
System active 24/7.`;
    }

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
    const emergencyContacts = ["+917684844015"];

    const emergencyAlert = `🚨 EMERGENCY SMS 🚨
From: ${fromNumber}
Msg: "${message}"
Time: ${new Date().toLocaleTimeString("en-IN")}
Respond now!`;

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
