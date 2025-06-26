import fetch from "node-fetch";
import EmailData from "./emaildata-model";

const sendEmail = async (emailData: EmailData): Promise<void> => {
  const response = await fetch(process.env.EMAIL_URL || "https://mashandiro-email-service.azurewebsites.net/api/EmailService", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    throw new Error(`Failed to send email: ${response.statusText}`);
  }
};

export const emailService = {
  sendEmail,
};