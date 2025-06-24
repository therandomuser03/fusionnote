import fs from 'fs';
import path from 'path';
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {

      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date (Date.now() + 3600000)
    }});
    console.log("Updated User for VERIFY", updatedUser)

    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
      }});
    }

    // console.log("Outside if-else");

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    const templatePath = path.join(process.cwd(), 'src', 'utils', 'emailTemplates', 'verifyOrResetEmail.html');
    let template = fs.readFileSync(templatePath, 'utf-8');

    const link = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
    const replacements: Record<string, string> = {
      '{{heading}}': emailType === "VERIFY" ? "Email Verification" : "Password Reset",
      '{{actionText}}': emailType === "VERIFY" ? "verify your email" : "reset your password",
      '{{buttonText}}': emailType === "VERIFY" ? "Verify Email" : "Reset Password",
      '{{link}}': link,
    };

    // Replace all placeholders
    for (const key in replacements) {
      template = template.replace(new RegExp(key, 'g'), replacements[key]);
    }

    const mailOptions = {
      from: 'Anubhab',
      to: email,
      subject: replacements['{{heading}}'],
      html: template,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
