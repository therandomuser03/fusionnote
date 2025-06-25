import fs from "fs";
import path from "path";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
// import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
}: SendEmailParams) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });
    }

    const templatePath = path.join(
      process.cwd(),
      "src",
      "utils",
      "emailTemplates",
      "verifyOrResetEmail.html"
    );
    let template = fs.readFileSync(templatePath, "utf-8");

    const link = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
    const replacements: Record<string, string> = {
      "{{heading}}":
        emailType === "VERIFY" ? "Email Verification" : "Password Reset",
      "{{actionText}}":
        emailType === "VERIFY" ? "verify your email" : "reset your password",
      "{{buttonText}}":
        emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      "{{link}}": link,
    };

    // Replace all placeholders
    for (const key in replacements) {
      template = template.replace(new RegExp(key, "g"), replacements[key]);
    }

    const emailResponse = await resend.emails.send({
      from: "FusionNote <onboarding@resend.dev>",
      to: email,
      subject: replacements["{{heading}}"],
      html: template,
    });

    console.log("Resend response:", emailResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
