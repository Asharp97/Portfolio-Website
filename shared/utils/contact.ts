import { z } from "zod";

type Translate = (key: string, parameters?: { min: number }) => string;

export function createContactSchema(t: Translate = key => key) {
  return z.object({
    email: z.string().trim().email(t("validation.email")).max(254),
    name: z.string().trim().min(2, t("validation.name_min", { min: 2 })).max(100)
      .regex(/^[^\r\n]+$/, t("validation.name_min", { min: 2 })),
    msg: z.string().trim().min(10, t("validation.msg_min", { min: 10 })).max(10000),
  });
}

export type ContactMessage = z.infer<ReturnType<typeof createContactSchema>>;
