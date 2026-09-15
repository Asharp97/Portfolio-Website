import nodemailer from "nodemailer";

let transport: ReturnType<typeof nodemailer.createTransport>;

export function getMailTransport() {
  if (!transport) {
    const port = Number(process.env.SMTP_PORT || 587);
    transport = nodemailer.createTransport({
      host: process.env.SMTP_SERVER || "smtp-relay.brevo.com",
      port,
      secure: port === 465,
      auth: { user: process.env.LOGIN, pass: process.env.PASSWORD },
      connectionTimeout: 10000,
      socketTimeout: 20000,
    });
  }
  return transport;
}
