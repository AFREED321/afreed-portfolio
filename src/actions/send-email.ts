"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const type = formData.get("type") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !type || !message) {
    return { error: "All fields are required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email address" };
  }

  const contactEmail = process.env.CONTACT_EMAIL;

  if (!contactEmail) {
    console.error("CONTACT_EMAIL environment variable is not set.");
    return { error: "Server configuration error." };
  }

  try {
    const { data, error } = await resend.emails.send({
      // When testing without a verified domain, Resend requires you to send from onboarding@resend.dev
      from: "Portfolio <onboarding@resend.dev>",
      to: [contactEmail],
      replyTo: email,
      subject: `New Portfolio Inquiry — ${type}`,
      text: `New message from your portfolio website\n\nName:\n${name}\n\nEmail:\n${email}\n\nProject Type:\n${type}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { error: "Failed to send message." };
    }

    return { success: true };
  } catch (error) {
    console.error("Unexpected error sending email:", error);
    return { error: "An unexpected error occurred." };
  }
}
