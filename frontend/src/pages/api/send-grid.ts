export const dynamic = "force-dynamic";
import * as sendgrid from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = req.body;
    await sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");
    if (process.env.SENDGRID_EMAIL_FROM && process.env.SENDGRID_EMAIL_TO) {
      const msg = {
        to: process.env.SENDGRID_EMAIL_TO,
        from: process.env.SENDGRID_EMAIL_FROM,
        subject: body.name,
        text: "Contact us",
        html: `<html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              }
            </style>
          </head>
          <body>
            <div class="container">
              <p>User Name: ${body.name}</p>
              <p>Project Name: ${body.projectName}</p>
              <p>Project Description: ${body.projectDescription}</p>
              <p>Contact: ${body.contact}</p>
            </div>
          </body>
        </html>`,
      };
      await sendgrid.send(msg);
      res.status(200).json({ msg });
    }
  } catch (e) {
    return res.json({ error: "something went wrong" });
  }
}
