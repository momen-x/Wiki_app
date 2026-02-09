import { domain_name } from "@/app/utils/Domain";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<{ success: boolean; error?: string }> => {
  const verificationLink = `${domain_name}/verify?token=${token}`;

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email address",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .button { 
                display: inline-block; 
                padding: 12px 24px; 
                text-decoration: none; 
                border-radius: 6px; 
                margin: 20px 0;
              }
              .footer { margin-top: 30px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Verify Your Email Address</h2>
              <p>Thank you for registering! Please click the button below to verify your email address:</p>
              <a href="${verificationLink}" class="button">Verify Email</a>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #4F46E5;">${verificationLink}</p>
              <p class="footer">
                This link will expire in 1 hour. If you didn't request this email, you can safely ignore it.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("❌ Email sending error:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ Verification email sent:", data);
    return { success: true };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};