import { createContactSchema } from "../../shared/utils/contact";
import { getMailTransport } from "../utils/mail";

const schema = createContactSchema();

export default defineEventHandler(async (event) => {
  const parsed = schema.safeParse(await readBody(event));
  if (!parsed.success) {
    throw createError({ statusCode: 400, statusMessage: "Invalid contact message" });
  }
  const recipient = process.env.MY_EMAIL;
  if (!recipient) {
    throw createError({ statusCode: 503, statusMessage: "Contact service is unavailable" });
  }
  const { email, name, msg } = parsed.data;
  try {
    const result = await getMailTransport().sendMail({
      from: process.env.SENDER || "ali-hisham@hotmail.com",
      to: recipient,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nFROM: ${email}\nMESSAGE: ${msg}`,
    });
    if (!result.accepted.length) throw new Error("No recipients accepted");
    return { success: true };
  } catch {
    throw createError({ statusCode: 502, statusMessage: "Unable to send message" });
  }
});
