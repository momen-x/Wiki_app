import { domain_name } from "@/app/utils/Domain";
import {Resend} from "resend"


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationToken = async (email: string, token: string) => {
  try {
    const link = `${domain_name}/verify?token=${token}`; 
    
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: `<div>
        <p>Please click the link below to verify your email address:</p>
        <a href="${link}"><strong>Verify Email</strong></a>
        <p>Or copy and paste this URL in your Browser: ${link}</p>
      </div>`,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send verification email");
    }

    return data;
  } catch (error) {
    console.error("Email sending failed:", error);
    throw error;
  }
};