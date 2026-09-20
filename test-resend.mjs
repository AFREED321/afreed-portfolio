import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

console.log("RESEND_API_KEY exists:", !!RESEND_API_KEY);
console.log("RESEND_API_KEY starts with:", RESEND_API_KEY ? RESEND_API_KEY.substring(0, 4) + "..." : "N/A");
console.log("CONTACT_EMAIL:", CONTACT_EMAIL);

const resend = new Resend(RESEND_API_KEY);

async function test() {
  console.log("Sending test email...");
  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [CONTACT_EMAIL || "mohammedafreed197@gmail.com"],
      replyTo: "phylamgaming@gmail.com",
      subject: `New Portfolio Inquiry — commercial`,
      text: `Name: lolo\nEmail: phylamgaming@gmail.com\nProject Type: commercial\nMessage: aaaaa`,
    });

    if (error) {
      console.error("Resend API Error returned:", JSON.stringify(error, null, 2));
    } else {
      console.log("Success! Data:", data);
    }
  } catch (err) {
    console.error("Caught exception:", err);
  }
}

test();
