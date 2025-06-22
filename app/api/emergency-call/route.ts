import type { NextApiRequest, NextApiResponse } from "next";
import twilio, { Twilio } from "twilio";

const client: Twilio = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const callerNumber: string | undefined = req.body.From;
    if (!callerNumber) {
      return res.status(400).json({ message: "Missing caller number" });
    }

    const emergencyLocation = "123 Main Street, Downtown Mumbai, Maharashtra";

    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">Emergency alert activated. The person at ${emergencyLocation} is in an emergency situation. Please send help immediately. This is an automated emergency call.</Say>
    <Pause length="2"/>
    <Say voice="alice">Emergency location: ${emergencyLocation}. Please respond as soon as possible.</Say>
</Response>`;

    const smsMessage = `🚨 EMERGENCY ALERT 🚨
    
Someone is in an emergency situation!

Location: ${emergencyLocation}
Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
Phone: ${callerNumber}

Please send help immediately!`;

    // Send SMS to the same number that called (for demo purposes)
    // In real scenario, you'd send to emergency contacts
    await client.messages.create({
      body: smsMessage,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: callerNumber, // Sending back to caller for demo
    });

    // You can also send to predefined emergency contacts
    const emergencyContacts: string[] = ["+917684844015"];

    // Send SMS to emergency contacts
    for (const contact of emergencyContacts) {
      try {
        await client.messages.create({
          body: smsMessage,
          from: process.env.TWILIO_PHONE_NUMBER!,
          to: contact,
        });
      } catch (smsError) {
        console.error(`Failed to send SMS to ${contact}:`, smsError);
      }
    }

    // Return TwiML response
    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(twiml);
  } catch (error: unknown) {
    console.error("Emergency call handler error:", error);

    // Fallback TwiML response
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">Emergency system activated. Help is on the way.</Say>
</Response>`;

    res.setHeader("Content-Type", "text/xml");
    res.status(200).send(errorTwiml);
  }
}
