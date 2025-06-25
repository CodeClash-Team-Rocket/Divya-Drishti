import { NextRequest, NextResponse } from "next/server";
import twilio, { Twilio } from "twilio";

const client: Twilio = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const callerNumber: string | null = formData.get("From") as string;

    if (!callerNumber) {
      return NextResponse.json(
        { message: "Missing caller number" },
        { status: 400 }
      );
    }

    const emergencyLocation = "Bhopal Indore Highway , Madhya Pradesh";

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

    await client.messages.create({
      body: smsMessage,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: callerNumber,
    });

    const emergencyContacts: string[] = ["+918530480982"];

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

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error: unknown) {
    console.error("Emergency call handler error:", error);

    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice">Emergency system activated. Help is on the way.</Say>
</Response>`;

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
      },
    });
  }
}
