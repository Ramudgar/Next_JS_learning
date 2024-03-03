import nodemailer from "nodemailer";
import User from "@//models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "resetPassword") {
      await User.findByIdAndUpdate(userId, {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6808fb24e7c391",
        pass: "c1044e99d6afe9",
        //   TODO: Add your credentials in .env file
      },
    });

    let mailOptions = {
      from: "ramudgary52@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
      html:
        // emailType === "verifyEmail"
        //   ? `<h1>Click on the link to verify your email</h1>
        // <a href=" ${process.env.DOMAIN}/verify-email/${hashedToken}">Verify Email</a>`
        //   : `<h1>Click on the link to reset your password</h1>
        // <a href=" ${process.env.DOMAIN}/reset-password/${hashedToken}">Reset Password</a>`,
        ` <p> Click <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">here</a> to ${
          emailType === "VERIFY" ? "verify your email" : "Reset your Password"
        }
        <br>
        or copy and paste the link below in your browser.
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </P>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
