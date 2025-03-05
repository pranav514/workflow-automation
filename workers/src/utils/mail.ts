import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { PASSWORD, SERVER_HOST, SERVER_PORT, SERVER_USER } from "../config";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: SERVER_HOST,
  port: parseInt(SERVER_PORT),
  secure: true,
  auth: {
    user: "pranavsalunkhe327@gmail.com",
    pass: PASSWORD,
  },
});

export const sendMail = async (to: string, body: string) => {
  try {
    await transporter.sendMail({
      to,
      subject: "this is test verification mail",
      text: body,
    });
    console.log("email send");
  } catch (error) {
    console.log("error ", error);
  }
};
